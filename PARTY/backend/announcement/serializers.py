"""
Serializers for announcements API.
"""
from rest_framework import serializers

from .models import (
    Announcement,
    Category,
    Image,
    Movie,
    Favourite,
)


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
            "displayed"
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
    class Meta:
        model = Favourite
        fields = (
            "user",
            "announcement"
        )
