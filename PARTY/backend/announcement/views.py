"""
Views for announcements APIs.
"""
from announcement import models, serializers
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
# from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """View to manage category APIs."""

    serializer_class = serializers.CategorySerializer
    # queryset = models.Category.objects.all()
    lookup_field = "uuid"

    def get_queryset(self):
        """Define custom queryset."""
        return models.Category.objects.all()


class ImageViewSet(viewsets.ModelViewSet):
    """View to manage image APIs."""

    serializer_class = serializers.ImageSerializer

    def get_permissions(self):
        """Instantiates and returns the list of permissions that this view requires."""

        if self.action == "list":
            permission_classes = (AllowAny,)
        else:
            permission_classes = (IsAuthenticated,)
            authentication_classes = (JWTTokenUserAuthentication,)

    def get_queryset(self):
        """Define custom queryset."""
        return models.Image.objects.all()

    def perform_create(self, serializer):
        """Create a new image."""
        # TODO: I can create without authentication...
        permission_classes = (IsAuthenticated,)
        authentication_classes = (JWTTokenUserAuthentication,)
        # print("data:::: ", serializer.data)
        print("request:::: ", self.request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(status=status.HTTP_400_BAD_REQUEST)


class AnnouncementViewSet(viewsets.ModelViewSet):
    """View for manage announcement APIs."""

    # model = models.Announcement
    serializer_class = serializers.AnnouncementDetailSerializer

    def get_permissions(self):
        """Instantiates and returns the list of permissions that this view requires."""

        if self.action == "list":
            permission_classes = (AllowAny,)
        else:
            permission_classes = (IsAuthenticated,)
            authentication_classes = (JWTTokenUserAuthentication,)

    def get_serializer_class(self):
        """Return serializer class for request."""
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
        # TODO: add image...
        serializer.save(user=user, category=category)
