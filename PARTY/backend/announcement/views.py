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

from .models import Announcement, Category
from .serializers import AnnouncementSerializer, CategorySerializer


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    # lookup_field = "uuid"


class AnnouncementCraeteView(CreateAPIView):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

    def post(self, request, *args, **kwargs):
        """
        add announcement
        """
        data = {
            "title": request.data.get("title"),
            "description": request.data.get("description"),
            "user": request.user.pk,
    #         # "category": request.data.get("category"),
    #         # 'event_type':request.data.get('event_type'),
    #         # 'images':request.data.get('images'),
        }
        print("data: ", data)
        permission_classes = (IsAuthenticated,)

        serializer = AnnouncementSerializer(data=data)
        if serializer.is_valid():
            print("in post")
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
    permission_classes = (IsAuthenticated, AllowAny)
    serializer_class = AnnouncementSerializer
    lookup_field = "uuid"
