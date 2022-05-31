"""
Views for announcements APIs.
"""
from announcement import models, serializers
from django.shortcuts import render,get_object_or_404
from rest_framework import status, viewsets
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
    JWTTokenUserAuthentication,
)  # JWTAuthentication,
from rest_framework_simplejwt.tokens import Token

# from .models import Announcement, Category
# from .serializers import AnnouncementSerializer, CategorySerializer


# class CategoryListView(ListAPIView):
    # serializer_class = CategorySerializer
    # queryset = Category.objects.all()
    # lookup_field = "uuid"

class CategoryViewSet(viewsets.ModelViewSet):
    """ View tomanage category APIs. """
    serializer_class=serializers.CategorySerializer
    queryset=models.Category.objects.all()
    # permission_classes=(IsAuthenticated,)
    # authentication_classes=(JWTTokenUserAuthentication,)

    # def list(self, request):
        # """ Return list of categories. """
        # serializer_class=serializers.CategorySerializer(self.queryset,many=True)
        # return Response(serializer_class.data)

# try viewsets
class AnnouncementViewSet(viewsets.ModelViewSet):
    """View for manage announcement APIs."""

    serializer_class = serializers.AnnouncementDetailSerializer
    # queryset = models.Announcement.objects.all()
    # authentication_classes = (JWTTokenUserAuthentication,)
    permission_classes = (
        # IsAuthenticated,
        AllowAny,
    )

    def get_serializer_class(self):
        """Return serializer class for requset."""
        if self.action == "list":
            return serializers.AnnouncementSerializer
        return self.serializer_class

    def get_queryset(self):
        """ Define custom queryset. """
        return models.Announcement.objects.all().order_by('title')

    def get_object(self,queryset=None,**kwargs):
        """ Get object by slug. """
        item=self.kwargs.get('pk')
        # print('item: ',item)
        return get_object_or_404(models.Announcement,slug=item)

    # def list(self, request):
    #     """Return list of announcements."""
    #     serializer_class = serializers.AnnouncementSerializer(
    #         self.queryset,
    #         many=True,
    #     )
    #     return Response(serializer_class.data)
    # def create(self, validated_data):  # request):
    #     """Create a new announcement."""
    #     authentication_classes = (JWTTokenUserAuthentication,)
    #     permission_classes = (IsAuthenticated,)
    #     return models.Announcement.objects.create(**validated_data)

    def perform_create(self, serializer):
        """Create a new announcement."""
        authentication_classes = (JWTTokenUserAuthentication,)
        permission_classes = (IsAuthenticated,)
        print("request: ", self.request)
        serializer.save(user=self.request.user)


# class CreateAnnouncementView(CreateAPIView):
    # queryset = Announcement.objects.all()
    # serializer_class = AnnouncementSerializer
    # authentication_classes = (JWTTokenUserAuthentication,)
    # permission_classes = (IsAuthenticated,)

    # def post(self, request, *args, **kwargs):
    #     """
    #     add announcement
    #     """
    #     data = {
    #         "title": request.data.get("title"),
    #         "description": request.data.get("description"),
    #         "user": request.user.pk,
    #         "category": request.data.get("category"),
    #         #         # 'event_type':request.data.get('event_type'),
    #         #         # 'images':request.data.get('images'),
    #     }
    #     # print("data: ", data)
    #     # TODO: in data there is no 'user' and 'category'
    #     # permission_classes = (IsAuthenticated,)
    #     # serializer = AnnouncementSerializer(data=data)
    #     serializer = AnnouncementSerializer(**data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class AnnouncementListView(ListAPIView):
    # serializer_class = AnnouncementSerializer
    # queryset = Announcement.objects.all()
    # queryset = Announcement.objects.all()[:3]
    # lookup_field = "uuid"
    # parser_classes = (FormParser, MultiPartParser)


# class AnnouncementRetriveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    # queryset = Announcement.objects.all()
    # permission_classes = (
        # IsAuthenticated,
    # )
    # serializer_class = AnnouncementSerializer
    # lookup_field = "uuid"
