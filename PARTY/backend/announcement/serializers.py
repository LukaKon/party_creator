"""
Serializers for announcements API.
"""
from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Announcement, Category, Image


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
        )
        read_only_fields = ("id",)


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


# class EventTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EventType
#         fields = ("name",)


class ImageSerializer(serializers.ModelSerializer):
    """Image serializer."""

    class Meta:
        model = Image
        fields = (
            "id",
            "announcement",
            # "event_type",
            "image",
            "is_main",
        )
        read_only_fields = ("id",)


class AnnouncementSerializer(serializers.ModelSerializer):
    """Announcement serializer."""

    # images = ImageSerializer(
    #     # many=True,
    # )  # read_only=True)
    # user = UserSerializer(many=False)

    # event_type = EventType(many=True)#, read_only=True)
    # category = CategorySerializer(many=False, required=True)

    class Meta:
        model = Announcement
        fields = (
            # TODO: should it be in order like in model?
            "id",
            "title",
            # "description",
            "user",
            "category",
            # "event_type",
            "images",
            "created",
            "slug",
            "uuid",
        )
        read_only_fields = (
            "id",
            # "event_type",
            # "user",
            "slug",
            # "uuid",
            # "created",
        )
        depth = 1

    # def get_category(self, obj):
    #     return obj.get_category_display()

    # def create(self, validated_data):
    #     print("data: ", validated_data)
    #     title = validated_data.pop("title")
    #     description = validated_data.pop("description")
    #     user = validated_data.pop("user")
    #     category = validated_data.pop("category")
    #     announcement = Announcement(**validated_data)
    #     announcement.title = title
    #     announcement.description = description
    #     announcement.user = user
    #     announcement.category = category
    #     return announcement

    # def update(self, instance, validated_data):
    # return  # TODO: create update function


class AnnouncementDetailSerializer(AnnouncementSerializer):
    """Serializer for announcement detail view."""

    class Meta(AnnouncementSerializer.Meta):
        fields = AnnouncementSerializer.Meta.fields + ("description",)
