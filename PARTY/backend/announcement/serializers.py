"""
Serializers for announcements API.
"""
from rest_framework import serializers

from .models import Announcement, Category, Favourite, Image, Movie, Views


class CategorySerializer(serializers.ModelSerializer):
    get_name = serializers.CharField(source='get_name_display')

    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            'get_name',
            "uuid",
        )
        read_only_fields = (
            "id",
            "uuid",
        )


# class StdImageField(serializers.ImageField):
#     """
#     Get all the variations of the StdImageField
#     """
#
#     def to_internal_value(self, obj):
#         return self.get_variations_urls(obj)
#
#     def to_representation(self, obj):
#         return self.get_variations_urls(obj)
#
#     def get_variations_urls(self, obj):
#         """
#         Get all the logo urls.
#         """
#
#         # Initiate return object
#         return_object = {}
#
#         # Get the field of the object
#         field = obj.field
#         print('###: ', field)
#
#         # A lot of ifs going araound, first check if it has the field variations
#         if hasattr(field, 'variations'):
#             # Get the variations
#             variations = field.variations
#             # Go through the variations dict
#             for key in variations.keys():
#                 # Just to be sure if the stdimage object has it stored in the obj
#                 if hasattr(obj, key):
#                     # get the by stdimage properties
#                     field_obj = getattr(obj, key, None)
#                     if field_obj and hasattr(field_obj, 'url'):
#                         # store it, with the name of the variation type into our return object
#                         return_object[key] = super(
#                             StdImageField, self).to_representation(field_obj)
#
#         # Also include the original (if possible)
#         if hasattr(obj, 'url'):
#             return_object['original'] = super(
#                 StdImageField, self).to_representation(obj)
#
#         return return_object


class ImageSerializer(serializers.ModelSerializer):
    """Image serializer."""

    def to_internal_value(self, data):
        print('to_internal_value: ', self, data)

    def to_representation(self, instance):
        print('to_representation: ', self, instance)

    class Meta:
        model = Image
        fields = (
            "id",
            "uuid",
            "announcement",
            "image",
            "is_main",
            'created',
            'updated',
        )
        read_only_fields = (
            "id",
            'uuid',
            'created',
            'updated',
        )


class MovieSerializer(serializers.ModelSerializer):
    """Movie serializer."""

    class Meta:
        model = Movie
        fields = (
            'id',
            'uuid',
            'announcement',
            'movie_url',
            'created',
            'updated',
        )
        read_only_fields = (
            'id',
            'uuid',
            'created',
            'updated',
        )


class AnnouncementSerializer(serializers.ModelSerializer):
    """Announcement serializer."""

    category = CategorySerializer(many=True, read_only=True)
    announcement_favourites = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)

    class Meta:

        model = Announcement
        fields = (
            "id",
            "title",
            "user",
            "category",
            'images',
            'movies',
            "created",
            'updated',
            "slug",
            "uuid",
            "announcement_favourites",
            "views",
        )
        read_only_fields = (
            "id",
            "slug",
            'uuid',
            "created",
            'updated',
        )

        depth = 1


class AnnouncementDetailSerializer(AnnouncementSerializer):
    """Serializer for announcement detail view."""

    class Meta(AnnouncementSerializer.Meta):
        fields = AnnouncementSerializer.Meta.fields + ("description",)


class FavouriteSerializer(serializers.ModelSerializer):

    announcement = AnnouncementSerializer(many=True, read_only=True)

    class Meta:
        model = Favourite
        fields = (
            "id",
            "user",
            "announcement",
        )


class ViewsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Views
        fields = (
            "uuid_or_email",
            "announcement"
        )
