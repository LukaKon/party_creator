from account.models import User
from account.serializers import MyTokenObtainPairSerializer, RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class testAPI(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        data = {"TEST": "DONE", "user": request.user.email}
        return Response(data)