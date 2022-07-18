"""
Views for the user API.
"""
from account.models import User
from account.serializers import (
    MyTokenObtainPairSerializer,
    RegisterSerializer,
    UserSerializer,
)
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)
from rest_framework_simplejwt.views import TokenObtainPairView, api_settings, TokenViewBase


class LoginView(TokenObtainPairView):
    """Create a new auth token for user."""

    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    """Create a new user in the system."""

    queryset = get_user_model().objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


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


class testAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        data = {"TEST": "DONE"}
        return Response(data)


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
        user_information = self.serializer_class(user).data
        return Response(user_information)


class UpdateUserAPI(UpdateAPIView):
    model = get_user_model()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = self.model.objects.get(email=self.request.user.email)
        return queryset

    def patch(self, request, *args, **kwargs):
        user = self.get_queryset()
        user.image = request.data.get('image')
        user.save()
        return Response({})
