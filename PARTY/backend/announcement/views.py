"""
Views for announcements APIs.
"""
from announcement import models, serializers
from django.contrib.auth import get_user_model
from django.contrib.postgres.search import (SearchQuery, SearchRank,
                                            SearchVector)
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import (OpenApiParameter, OpenApiTypes,
                                   extend_schema, extend_schema_view)
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import (AllowAny, IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.response import Response


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """View to manage category APIs."""
    # permission_classes = (AllowAny, )
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
        ]
    )
)
class AnnouncementViewSet(viewsets.ModelViewSet):
    """View for manage announcement APIs."""

    serializer_class = serializers.AnnouncementDetailSerializer
    queryset = models.Announcement.objects.all()
    lookup_field = 'slug'

    def _params_to_uuid(self, qs):
        """Convert params to list of strings."""
        return list(qs.split(','))

    def get_permissions(self):
        """
            Instantiates and returns the list of permissions
            that this view requires.
        """

        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        """Return serializer class for request."""
        if self.action == "list":
            return serializers.AnnouncementSerializer
        return self.serializer_class

    def get_queryset(self):
        """ Define custom queryset. """
        main_page = self.request.query_params.get('main_page')
        categories = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        submit = self.request.query_params.get('submit')
        queryset = self.queryset

        if main_page:
            return models.Announcement.objects.main_page_ann()
        if categories and categories != 'false':
            categories_uuid = self._params_to_uuid(categories)
            queryset = queryset.filter(category__uuid__in=categories_uuid)

        if search:
            search_vector = SearchVector('title', weight='A') + \
                SearchVector('description', weight='B')
            search_query = SearchQuery(search)

            queryset = queryset.annotate(
                search=search_vector,
                rank=SearchRank(search_vector, search_query)
            ).filter(search=search_query).order_by('-rank')

            if submit == 'false':
                queryset = queryset[:3]

        return queryset

    def get_object(self, queryset=None, **kwargs):
        """Get object by slug."""
        slug = self.kwargs.get("slug")
        return get_object_or_404(models.Announcement, slug=slug)

    def perform_create(self, serializer):
        """Create a new announcement."""

        user = get_user_model().objects.get(email=self.request.user)

        categories_uuid = self.request.data.getlist('category')
        images = self.request.data.getlist('images')
        movies_url = self.request.data.get('movies')

        print('IN CREATE:')
        print('cat: ', categories_uuid)
        print('mov: ', movies_url)
        print('img: ', images)

        categories = []
        if categories_uuid:
            for uuid in categories_uuid[0].split(','):
                cat = models.Category.objects.get(uuid=uuid)
                categories.append(cat)

        announcement = serializer.save(user=user, category=categories)

        if images:
            for image in images:
                get_is_main = self.request.data.get(image.name)
                is_main = False
                if get_is_main == 'true':
                    is_main = True

                models.Image.objects.create(
                    announcement=announcement,
                    image=image,
                    is_main=is_main,
                )

        if movies_url:
            models.Movie.objects.create(
                movie_url=movies_url,
                announcement=announcement,
            )

        return Response(status=status.HTTP_201_CREATED)

    def partial_update(self, request, **kwargs):
        '''Update announcement.'''

        announcement = models.Announcement.objects.get()
        data = self.request.data

        announcement.title = data.get('title', announcement.title)
        announcement.description = data.get('description', announcement.description)
        announcement.is_active = data.get('is_active', announcement.is_active)

        print('title: ', announcement.title)
        print('descr: ', announcement.description)
        print('is_active: ', announcement.is_active)

        categories_uuid = self.request.data.getlist('category')
        images = self.request.data.getlist('images')
        movies_url = self.request.data.get('movies')

        if categories_uuid:
            categories = []
            for uuid in categories_uuid[0].split(','):
                cat = models.Category.objects.get(uuid=uuid)
                categories.append(cat)
            announcement.categories = categories
        else:
            announcement.categories

        if images:
            list_of_images = []
            for image in images:
                get_is_main = self.request.data.get(image.name)
                is_main = False
                if get_is_main == 'true':
                    is_main = True

                img = models.Image.objects.create(
                    announcement=announcement,
                    image=image,
                    is_main=is_main
                )
                list_of_images.append(img)
            announcement.images = list_of_images
        else:
            announcement.images

        if movies_url:
            models.Movie.objects.create(
                announcement=announcement,
                movie_url=movies_url,
            )
        else:
            announcement.movies

        print('IN UPDATE:')
        print('categories uuid: ', categories_uuid)
        print('images: ', images)
        print('movies: ', movies_url)
        # print('request: ', self.request.data)
        # print('kwargs: ', kwargs)

        announcement.save()
        return Response(status=status.HTTP_201_CREATED)

    def destroy(self, instance):
        '''Delete selected announcement.'''
        print('instance in delete func: ', instance)
        instance.delete()


class FavouriteViewSet(viewsets.ModelViewSet):
    '''Favourite announcements.'''

    serializer_class = serializers.FavouriteSerializer
    permission_classes = [IsAuthenticated, ]

    @action(detail=False, methods=['post'])
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        announcement = self.request.data.get("announcement")
        instance = models.Favourite.objects.get(
            user=user, announcement=announcement)
        serializer = self.get_serializer(instance)
        data_to_send = serializer.data
        self.perform_destroy(instance)
        return Response(data=data_to_send, status=status.HTTP_200_OK)

    def get_queryset(self):
        queryset = models.Favourite.objects.filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        announcement_id = self.request.data.get("announcement")[0]
        announcement = models.Announcement.objects.get(id=announcement_id)
        serializer.save(announcement=[announcement, ])


class ViewsViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ViewsSerializer
    permission_classes = [AllowAny, ]

    def perform_create(self, serializer):
        uuid_or_email = None
        if self.request.user.is_anonymous:
            uuid_or_email = self.request.data.get("uuid")
        else:
            uuid_or_email = str(self.request.user.email)
        try:
            serializer.save(uuid_or_email=uuid_or_email)
        except IntegrityError:
            pass
