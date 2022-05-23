from rest_framework import serializers

from account.models import User

from .models import Announcement, EventType, Image  # ServiceCategory


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            # "id",
            "email",
        )


# class ServiceCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ServiceCategory
#         fields = (
#             # "id",
#             "name",
#         )


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ("name",)


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
    # user = UserSerializer()
    # category = ServiceCategorySerializer()
    # category = ServiceCategorySerializer(read_only=True)
    # event_type = EventType()  # many=True, read_only=True)

    class Meta:
        model = Announcement
        fields = (
            # "id",
            "title",
            "description",
            "slug",
            "uuid",
            "user",
            # "category",
            # "event_type",
            "created",
            "images",
        )
        read_only_fields = (
            "slug",
            # "event_type",
        )

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
