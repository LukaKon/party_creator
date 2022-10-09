"""
Serializers for announcements API.
"""
from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import (
    Announcement,
    Category,
    Image,
    Movie,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
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
            # 'user',
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
            # 'user',
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

    class Meta:
        model = Announcement
        fields = (
            "id",
            "title",
            "user",
            "categories",
            'images',
            'movies',
            "created",
            'updated',
            "slug",
            "uuid",
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
