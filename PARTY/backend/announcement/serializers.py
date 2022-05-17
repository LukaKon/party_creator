from account.models import User
from rest_framework import serializers

from .models import Announcement, Category, Image


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "name",
            # "uuid",
        )


# class EventTypeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EventType
#         fields = ("name",)


# class ImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Image
#         fields = (
#             # "id",
#             "announcement",
#             "event_type",
#             "image",
#             "is_main",
#         )


class AnnouncementSerializer(serializers.ModelSerializer):
    # images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    # images = ImageSerializer(many=True, read_only=True)
    # user = UserSerializer()
    # category = ServiceCategorySerializer()
    # category = ServiceCategorySerializer(read_only=True)
    # event_type = EventType()  # many=True, read_only=True)
    # category = serializers.CharField(max_length=30, source="get_category_display")

    class Meta:
        model = Announcement
        fields = (
            "title",
            "description",
            "user",
            "category",
            # "event_type",
            # "images",
            "created",
        )
        read_only_fields = (
            # "event_type",
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
