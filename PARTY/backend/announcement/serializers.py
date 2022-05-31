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
    class Meta:
        model = Image
        fields = (
            "id",
            # "announcement",
            # "event_type",
            "image",
            "is_main",
        )
        read_only_fields = ("id",)

class AnnouncementSerializer(serializers.ModelSerializer):

    images = ImageSerializer(many=True, read_only=True)
    # user = UserSerializer(many=False)
    # category = ServiceCategorySerializer()
    # category = ServiceCategorySerializer(read_only=True)

    # event_type = EventType()  # many=True, read_only=True)
    category = CategorySerializer(many=False, required=True)

    # TODO: create 'create' function?
    # print("in serializer: ", user, category)

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
            "uuid",
            "created",
        )
    # def get_category(self, obj):
    #     return obj.get_category_display()

    def create(self, validated_data):
        print("data: ", validated_data)
        # announcement = Announcement(title=xyz...)
        # announcement.save(commit=False)
        user = validated_data.pop("user")
        category = validated_data.pop("category")
        announcement = Announcement(title=validated_data.get("title"))
        # for inp in validated_data:
        # announcement(inp=validated_data.get(inp))

        test = announcement.save(commit=False)
        test.user = user
        test.category = category
        test.save()
        # announcement = Announcement.objects.create(**validated_data)
        # announcement.user = user
        # announcement.category = category
        # announcement.save()
        return announcement

    # def update(self, instance, validated_data):
    # return  # TODO: create update function


class AnnouncementDetailSerializer(AnnouncementSerializer):
    """Serializer for announcement detail view."""

    class Meta(AnnouncementSerializer.Meta):
        fields = AnnouncementSerializer.Meta.fields + ("description",)
