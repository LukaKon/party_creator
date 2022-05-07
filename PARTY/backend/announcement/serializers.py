from account.models import User
from rest_framework import serializers

from .models import Announcement, Image, ServiceCategory


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            # "id",
            "email",
        )


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = (
            # "id",
            "name",
        )


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = (
            # "id",
            "announcement",
            "event_type",
            "image",
            "is_main",
        )


class AnnouncementSerializer(serializers.ModelSerializer):
    # images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    images = ImageSerializer(many=True, read_only=True)
    # user = UserSerializer()
    # category = ServiceCategory()

    class Meta:
        model = Announcement
        fields = (
            "id",
            "title",
            "description",
            "slug",
            # "user",
            "category",
            # "event",
            "created",
            "images",
        )
        read_only_fields = (
            "slug",
            "category",
            "event",
        )
