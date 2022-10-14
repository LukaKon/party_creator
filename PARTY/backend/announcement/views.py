"""
Views for announcements APIs.
"""

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator

from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from drf_spectacular.types import OpenApiTypes

from rest_framework import (
    status,
    viewsets,
)
from rest_framework.decorators import action
from rest_framework.parsers import (
    FormParser,
    MultiPartParser,
)
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication

from announcement import (
    models,
    serializers,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """View to manage category APIs."""

    serializer_class = serializers.CategorySerializer
    lookup_field = "uuid"

    def get_queryset(self):
        """Define custom queryset."""
        return models.Category.objects.all()


class ImageViewSet(viewsets.ModelViewSet):
    """View to manage image APIs."""

    serializer_class = serializers.ImageSerializer
    parser_classes = (FormParser, MultiPartParser,)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """Define custom queryset."""
        return models.Image.objects.all()


class MovieViewSet(viewsets.ModelViewSet):
    """View to manage movie APIs."""

    serializer_class = serializers.MovieSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """Define custom queryset."""
        return models.Movie.objects.all()


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'main_page',
                OpenApiTypes.BOOL,
                description='If true get announcements for main page',
            ),
            OpenApiParameter(
                'category',
                OpenApiTypes.STR,
                description='Comma separated list of categories uuid to filter'
            ),
            # OpenApiParameter(
                # 'amount',
                # OpenApiTypes.INT,
                # description='Amount of announcements'
            # )
        ]
    )
)
class AnnouncementViewSet(viewsets.ModelViewSet):
    """View for manage announcement APIs."""

    serializer_class = serializers.AnnouncementDetailSerializer
    queryset = models.Announcement.objects.all()
    lookup_field = 'slug'
    permission_classes = (IsAuthenticatedOrReadOnly,)


    def _params_to_uuid(self, qs):
        """Convert params to list of strings."""
        return [uuid for uuid in qs.split(',')]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions
        that this view requires.
        """
        # print(self.request.data)

        if self.request.method == "GET":
            return [AllowAny()]
        else:
            return [IsAuthenticated()]

    # FIXME
    # def get_authenticators(self):
    #     if self.request.method == 'GET':
    #         return []
#         return[JWTTokenUserAuthentication()]

    def get_serializer_class(self):
        """Return serializer class for request."""
        if self.action == "list":
            return serializers.AnnouncementSerializer
        return self.serializer_class

    def get_queryset(self):
        """ Define custom queryset. """
        main_page = self.request.query_params.get('main_page')
        categories = self.request.query_params.get('category')
        amount = self.request.query_params.get('amount')
        queryset = self.queryset

        if main_page:
            return models.Announcement.objects.main_page_ann()
        if categories:
            categories_uuid = self._params_to_uuid(categories)
            queryset = queryset.filter(category__uuid__in=categories_uuid)
        # if amount:
            # queryset = queryset[:int(amount)]

        return queryset

    def get_object(self, queryset=None, **kwargs):
        """Get object by slug."""
        slug= self.kwargs.get("slug")
        return get_object_or_404(models.Announcement, slug=slug)

    def perform_create(self, serializer):
        """Create a new announcement."""
        # permission_classes = (IsAuthenticated,)
        print("serializer: ", self.request.data)
        print('ser data: ', serializer)
        user = get_user_model().objects.get(email=self.request.data.get("user"))
        category = models.Category.objects.get(
            uuid=self.request.data.get("category"))
        # category = self.request.data.get("category")
        # TODO: add image...
        serializer.save(user=user, category=category)
        # serializer.save()
