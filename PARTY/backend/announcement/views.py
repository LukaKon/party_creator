"""
Views for announcements APIs.
"""
from announcement import models, serializers
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
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
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import (
    JWTTokenUserAuthentication,
)  # JWTAuthentication,
from rest_framework_simplejwt.tokens import Token


# try viewsets
class CategoryViewSet(viewsets.ModelViewSet):
    """View tomanage category APIs."""

    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()
    # permission_classes = (IsAdminUser,)
    # authentication_classes = (JWTTokenUserAuthentication,)
    lookup_field = "uuid"

    def get_queryset(self):
        """Define custom queryset."""
        return models.Category.objects.all()


class AnnouncementViewSet(viewsets.ModelViewSet):
    """View for manage announcement APIs."""

    # model = models.Announcement
    serializer_class = serializers.AnnouncementDetailSerializer
    # serializer_class = serializers.AnnouncementSerializer
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

    def get_object(self, queryset=None, **kwargs):
        """Get object by slug."""
        item = self.kwargs.get("pk")
        return get_object_or_404(models.Announcement, slug=item)

    # def create(self, validated_data):  # validated_data == request
    #     test1 = self.request.data
    #     test = test1.dict()
    #     print("TEST: ", test)
    #     serializer = self.get_serializer(data=test)
    #     # print(self.validated_data)
    #     # print(self.request.data)
    #     # test = self.request.data
    #     user_id = test.pop("user")
    #     category = test.pop("category.name")
    #     # category_instance = models.Category.objects.get(name=category)
    #     user_instance = get_user_model().objects.get(id=user_id)
    #     category_instance = models.Category.objects.all().first()
    #     # print("====cat:", category_instance)
    #     if not serializer.is_valid():
    #         print("========error", serializer.errors)
    #     data = serializer.validated_data
    #     serializer.save(user=user_instance, category=category_instance)
    #     # serializer.save(user=user_instance, category=category_instance)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(
    #         serializer.data, status=status.HTTP_201_CREATED, headers=headers
    #     )

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

    # def create(self, request, *args, **kwargs):
    #     data = {
    #         "title": request.data.get("title"),
    #         "description": request.data.get("description"),
    #         "user": request.user,
    #         "category": request.data.get("category"),
    #     }

    #     serializer = self.get_serializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     # self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(
    #         serializer.data,
    #         status=status.HTTP_201_CREATED,
    #         headers=headers,
    #     )

    def create(self, request):
        """Create a new announcement."""
        print("====: ", request.data)
        # authentication_classes = (JWTTokenUserAuthentication,)
        # permission_classes = (IsAuthenticated,)
        csrf = self.request.data.pop("csrfmiddlewaretoken")
        # user=self.request.data.pop('user')
        # category=self.request.data.pop('category')
        announcement = models.Announcement.objects.create(**self.request.data)
        announcement.save()
        # serializer = self.get_serializer_class()(announcement)
        serializer = self.self.get_serializer(announcement)
        return Response(serializer.data)

    # def perform_create(self, serializer):
    # """Create a new announcement."""
    # # authentication_classes = (JWTTokenUserAuthentication,)
    # permission_classes = (IsAuthenticated,)
    # print("serializer: ", self.request.data)
    # serializer.save(user=self.request.user)


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
