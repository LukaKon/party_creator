"""
Views for the user API.
"""
from account.serializers import (
    MyTokenObtainPairSerializer,
    RegisterSerializer,
    UserSerializer,
    ChangePasswordSerializer,
)
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

import back.settings as settings
from .tokens import token_manage
from back.utils.account import activate_account_send_email, change_email_send_email


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

    def check_free_email(self, email):
        if self.model.objects.filter(email=email).exists():
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
                # activate_email(self.request, user, email) # TODO adjust message + email + user etc
                # user.email = new_email
                # user.save()
                return Response(self.serializer_class(user).data, status=status.HTTP_200_OK)

            return Response(self.serializer_class(user).data, status=status.HTTP_304_NOT_MODIFIED)

        # user.image = request.data.get('image')
        # user.save()
        return Response({})  # to make something with it


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
                return Response({"password": ["Podane hasło jest nieprawidłowe"]}, status=status.HTTP_400_BAD_REQUEST)
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

    def user_activation(self, user):
        user.is_active = True
        user.save()
        return Response(status=status.HTTP_202_ACCEPTED)

    def post(self, request):
        change_or_activation = self.request.data.get("change_or_activation")
        if change_or_activation == 'change_email':
            new_email = request.data.get('new_email')

        uid = request.data.get('uid')
        token = request.data.get('token')
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = get_user_model().objects.get(id=user_id)
        except:
            user = None

        if change_or_activation == 'change_email':
            pass
        elif change_or_activation == 'activation':
            pass
        # if user is not None and token_manage.check_token(user, token):
        #     user.is_active = True
        #     user.save()
        #     return Response(status=status.HTTP_202_ACCEPTED)
        # else:
        #     return Response({"message": "Invalid activation link"}, status=status.HTTP_401_UNAUTHORIZED)
