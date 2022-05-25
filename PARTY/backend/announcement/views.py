from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import (
    JWTAuthentication,
    JWTTokenUserAuthentication,
)
from rest_framework_simplejwt.tokens import Token

from .models import Announcement, Category
from .serializers import AnnouncementSerializer, CategorySerializer


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = (AllowAny,)
    # lookup_field = "uuid"


class CreateAnnouncementView(CreateAPIView):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    # authentication_classes=(JWTAuthentication,)
    authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (IsAuthenticated,)

    # def get(self,request,*args,**kwargs)
    # token=Token.objects.

    def post(self, request, *args, **kwargs):
        """
        add announcement
        """
        # print("req: ", request.user, request.auth)
        # print("user: ", request.user.pk)
        data = {
            "title": request.data.get("title"),
            "description": request.data.get("description"),
            "user": request.user.pk,
            "category": request.data.get("category"),
            #         # 'event_type':request.data.get('event_type'),
            #         # 'images':request.data.get('images'),
        }
        # print("data: ", data)
        # TODO: in data there is no 'user' and 'category'
        # permission_classes = (IsAuthenticated,)
        # serializer = AnnouncementSerializer(data=data)
        serializer = AnnouncementSerializer(**data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnnouncementListView(ListAPIView):
    serializer_class = AnnouncementSerializer
    # queryset = Announcement.objects.all()
    queryset = Announcement.objects.all()[:3]
    lookup_field = "uuid"
    # parser_classes = (FormParser, MultiPartParser)


class AnnouncementRetriveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Announcement.objects.all()
    permission_classes = (
        IsAuthenticated,
        AllowAny,
    )
    serializer_class = AnnouncementSerializer
    lookup_field = "uuid"
