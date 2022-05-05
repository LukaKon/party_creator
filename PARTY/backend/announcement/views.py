from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Announcement
from .serializers import AnnouncementSerializer, ImageSerializer


class AnnouncementCraeteView(CreateAPIView):
    queryset = Announcement.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = AnnouncementSerializer

    # def get(self, request, *args, **kwargs):
    # serializer = AnnouncementSerializer
    # TODO: not like that


class AnnouncementListView(ListCreateAPIView):
    queryset = Announcement.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = AnnouncementSerializer
    loogup_field = "uuid"
    # parser_classes = (FormParser, MultiPartParser)

    # def get(self, request, *args, **kwargs):
    # announcements = Announcement.objects.all()
    # serializer = AnnouncementSerializer(announcements, many=True)
    # return Response(serializer.data)

    # def post(self, request, *args, **kwargs):
    # announcement_serializer = AnnouncementSerializer(data=request.data)
    # if announcement_serializer.is_valid():
    # announcement_serializer.save()
    # return Response(
    # announcement_serializer.data, status=status.HTTP_201_CREATED
    # )
    # else:
    # print(f"Error {announcement_serializer.errors}")
    # return Response(
    # announcement_serializer.errors, status=status.HTTP_400_BAD_REQUEST
    # )


class AnnouncementRetriveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Announcement.objects.all()
    permission_classes = (IsAuthenticated, AllowAny)
    serializer_class = AnnouncementSerializer
    lookup_field = "uuid"
