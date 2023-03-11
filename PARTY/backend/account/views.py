"""
Views for the user API.
"""
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password, get_password_validators
from django.core.exceptions import ValidationError
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import status, exceptions
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)

from rest_framework_simplejwt.views import TokenObtainPairView

from .tokens import token_manage
from back.utils.account import activate_account_send_email, change_email_send_email
import back.settings as settings
from account.serializers import (
    MyTokenObtainPairSerializer,
    RegisterSerializer,
    UserSerializer,
    ChangePasswordSerializer,
)


class LoginView(TokenObtainPairView):
    """Create a new auth token for user."""

    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    """Create a new user in the system."""

    queryset = get_user_model().objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        serializer.save(is_active=False)
        email = self.request.data.get("email")
        user = self.queryset.get(email=email)
        activate_account_send_email(self.request, user, email)


class LogoutAllView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            tokens = OutstandingToken.objects.filter(user_id=request.user.id)
            for token in tokens:
                t, _ = BlacklistedToken.objects.get_or_create(token=token)

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetUserAPI(RetrieveAPIView):
    model = get_user_model()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.data.get('email') is None:
            queryset = self.model.objects.get(email=self.request.user.email)
        else:
            queryset = self.model.objects.get(email=self.request.data.get('email'))
        return queryset

    def post(self, request):
        user = self.get_queryset()
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)


class UpdateUserAPI(UpdateAPIView):
    model = get_user_model()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    @staticmethod
    def check_free_email(email):
        if get_user_model().objects.filter(email=email).exists():
            return False
        else:
            return True

    def detect_type_of_change(self):
        return self.request.data.get('change')

    def get_queryset(self):
        queryset = self.model.objects.get(email=self.request.user.email)
        return queryset

    def patch(self, request, *args, **kwargs):
        change = self.detect_type_of_change()
        user = self.get_queryset()

        if change == "email":
            password = request.data.get('password')
            new_email = request.data.get('newEmail')

            if user.check_password(password) and self.check_free_email(new_email):
                change_email_send_email(self.request, user, new_email)
                return Response(self.serializer_class(user).data, status=status.HTTP_200_OK)

            return Response(self.serializer_class(user).data, status=status.HTTP_401_UNAUTHORIZED)
        if change == "image":
            user.image = self.request.data.get('image')
            user.save()
            return Response(self.serializer_class(user).data, status=status.HTTP_200_OK)

        return Response(self.serializer_class(user).data, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(UpdateAPIView):
    ''' An endpoint for changing password '''
    serializer_class = ChangePasswordSerializer
    model = get_user_model()
    permission_classes = (IsAuthenticated, )
    object = None

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"password": ["The password is wrong"]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get

            try:
                # validate the password against existing validators
                validate_password(
                    serializer.data.get("new_password"),
                    user=request.user,
                    password_validators=get_password_validators(settings.AUTH_PASSWORD_VALIDATORS)
                )
            except ValidationError as e:
                # raise a validation error for the serializer
                raise exceptions.ValidationError({
                    'password': e.messages
                })

            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': [],
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HandleEmailView(APIView):
    permission_classes = [AllowAny, ]

    def check_user_and_token(self, user, token):
        if user is not None and token_manage.check_token(user, token):
            return True
        else:
            return False

    def user_activation(self, user):
        user.is_active = True
        user.save()

    def change_email(self, user, new_email):
        user.email = new_email
        user.save()

    def post(self, request):
        change_or_activation = self.request.data.get("change_or_activation")
        uid = request.data.get('uid')
        token = request.data.get('token')
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = get_user_model().objects.get(id=user_id)
        except:
            user = None

        if change_or_activation == 'change_email':
            new_email_before_decode = request.data.get('new_email')
            new_email = force_str(urlsafe_base64_decode(new_email_before_decode))
            if self.check_user_and_token(user, token) and UpdateUserAPI.check_free_email(new_email):
                self.change_email(user, new_email)
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

        elif change_or_activation == 'activation':
            if self.check_user_and_token(user, token):
                self.user_activation(user)
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
