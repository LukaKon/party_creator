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


class ImageSerializer(serializers.ModelSerializer):
    """Image serializer."""

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
            "uuid",
            "is_active",
            "title",
            "user",
            "category",
            'images',
            'movies',
            "created",
            'updated',
            "slug",
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


class AnnouncementForConversationSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Announcement
        fields = ('images', "title", "user", "id")

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        main_image = next((img for img in representation['images'] if img['is_main']), None)
        if main_image:
            representation['images'] = [main_image]
        else:
            representation['images'] = []
        return representation


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
