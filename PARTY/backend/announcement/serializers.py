from account.models import User
from rest_framework import serializers

from .models import Announcement, Category, Image


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email",)


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
            # "id",
            # "announcement",
            # "event_type",
            "image",
            "is_main",
        )


class AnnouncementSerializer(serializers.ModelSerializer):
    # images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    images = ImageSerializer(many=True, read_only=True)
    user = UserSerializer(many=False)
    # category = ServiceCategorySerializer()
    # category = ServiceCategorySerializer(read_only=True)

    # event_type = EventType()  # many=True, read_only=True)
    category = CategorySerializer(required=True)

    # TODO: create 'create' function?
    print("in serializer: ", user, category)

    class Meta:
        model = Announcement
        fields = (
            # TODO: should it be in order like in model?
            "title",
            "description",
            "user",
            "category",
            # "event_type",
            "images",
            "created",
            "slug",
            "uuid",
        )
        read_only_fields = (
            # "event_type",
            "slug",
            "uuid",
            "created",
        )

    # def get_category(self, obj):
    #     return obj.get_category_display()

    # def create(self, validated_data):
    #     #     print("data: ", validated_data)
    #     category_data = validated_data.pop("user")
    #     #     print("profile_data: ", category_data)
    #     announcement = Announcement.objects.create(**validated_data)
    #     #     print("announcement: ", announcement)
    #     # user=
    #     # ServiceCategory.objects.create(announcement=announcement, **category_data)
    #     return announcement

    # def update(self, instance, validated_data):
    # return  # TODO: create update function
