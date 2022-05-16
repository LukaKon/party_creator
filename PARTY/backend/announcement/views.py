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

from .models import Announcement
from .serializers import AnnouncementSerializer, ImageSerializer


class AnnouncementCraeteView(CreateAPIView):
    queryset = Announcement.objects.all()
    # permission_classes = (IsAuthenticated,) # TODO: uncomment that
    # permission_classes = (AllowAny,)
    serializer_class = AnnouncementSerializer
    # lookup_field = "email"

    def post(self, request, *args, **kwargs):
        """
        add announcement
        """
    #     print("request: ", request.data)
        print("-----user: ", request.user)
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

        print("ser: ", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnnouncementListView(ListAPIView):
    # permission_classes = (AllowAny,)
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()
    lookup_field = "uuid"
    # parser_classes = (FormParser, MultiPartParser)

    # def get(self, request, *args, **kwargs):
    #     """
    #     list all announcement
    #     """
    #     permission_classes = (AllowAny,)
    #     queryset = Announcement.objects.all()
    #     serializer = AnnouncementSerializer(many=True)
    #     print("====data:", serializer.data)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

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
