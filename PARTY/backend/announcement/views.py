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


    def perform_create(self, serializer):
        """Create a new announcement."""
        # authentication_classes = (JWTTokenUserAuthentication,)
        # permission_classes = (IsAuthenticated,)
        print("serializer: ", self.request.data)
        user = get_user_model().objects.get(email=self.request.data.get("user"))
        category = models.Category.objects.get(uuid=self.request.data.get("category"))
        serializer.save(user=user, category=category)
