from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from account.models import User
from account.serializers import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer


class LoginView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(CreateAPIView):
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
