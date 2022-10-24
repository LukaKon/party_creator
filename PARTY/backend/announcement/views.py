"""
Views for announcements APIs.
"""
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
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


# from rest_framework.parsers import FormParser, MultiPartParser
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
    # permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        """Instantiates and returns the list of permissions that this view requires."""
        print(self.request.data)

        # if self.action == "list":
        if self.request.method == "GET":
            return [AllowAny()]
        else:
            return [IsAuthenticated()]
            # authentication_classes = (JWTTokenUserAuthentication,)

    def get_queryset(self):
        """Define custom queryset."""
        return models.Image.objects.all()

    # @method_decorator(login_required)
    def perform_create(self, serializer):
        """Create a new image."""
        # TODO: I can create without authentication...
        # permission_classes = (IsAuthenticated,)
        # authentication_classes = (JWTTokenUserAuthentication,)
        # print("data:::: ", serializer.data)
        print("request:::: ", self.request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(status=status.HTTP_400_BAD_REQUEST)


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'category',
                OpenApiTypes.STR,
                description='Comma separated list of categories uuid to filter'
            ),
            OpenApiParameter(
                'amount',
                OpenApiTypes.INT,
                description='Amount of announcements'
            )
        ]
    )
)
class AnnouncementViewSet(viewsets.ModelViewSet):
    """View for manage announcement APIs."""

    # model = models.Announcement
    serializer_class = serializers.AnnouncementDetailSerializer
    parser_classesses = (MultiPartParser, FormParser,)
    queryset = models.Announcement.objects.all()
    lookup_field = 'slug'
    permission_classes = ()
    # authentication_classes = ()
    
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
        categories = self.request.query_params.get('category')
        amount = self.request.query_params.get('amount')
        queryset = self.queryset

        if categories:
            categories_uuid = self._params_to_uuid(categories)
            queryset = queryset.filter(category__uuid__in=categories_uuid)
        if amount:
            queryset = queryset[:int(amount)]

        return queryset
        # FIXME
        # return queryset.order_by('title').distinct()
        # return models.Announcement.objects.all().order_by('title')

    def get_object(self, queryset=None, **kwargs):
        """Get object by slug."""
        slug= self.kwargs.get("slug")    # slug
        return get_object_or_404(models.Announcement, slug=slug)

    def perform_create(self, serializer):
        """Create a new announcement."""
        # authentication_classes = (JWTTokenUserAuthentication,)
        # permission_classes = (IsAuthenticated,)
        # print("serializer: ", self.request.data)
        user = get_user_model().objects.get(email=self.request.data.get("user"))
        category = models.Category.objects.get(
            uuid=self.request.data.get("category"))
        # category = self.request.data.get("category")
        # TODO: add image...
        serializer.save(user=user, category=category)
        # serializer.save()


class FavouriteViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FavouriteSerializer
    permission_classes = [IsAuthenticated, ]

    @action(detail=False, methods=['post'])
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        announcement = self.request.data.get("announcement")
        instance = models.Favourite.objects.filter(user=user, announcement=announcement)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # def create(self, request, *args, **kwargs):
    #     print('request - data', request.data)
    #     data = request.data
    #     data["user"] = [request.user.id, ]
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        queryset = models.Favourite.objects.filter(user=self.request.user)
        return queryset


