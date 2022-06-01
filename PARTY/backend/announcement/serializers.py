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

    # images = ImageSerializer(many=True,)# read_only=True)
    # user = UserSerializer(many=False)

    # event_type = EventType(many=True)#, read_only=True)
    category = CategorySerializer(many=False, required=True)

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
            # "images",
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
        user = validated_data.pop("user")
        category = validated_data.pop("category")
        cat={}
        for k,v in category.items():
            print(k,v)
            cat[k]=v
        category_obj=Category.objects.get(name=cat['name'])
        print(f'val data: {validated_data}; user: {user}; cat: {category_obj}')
        # announcement = Announcement.objects.create(**validated_data,user=user,category=category['name'])
        # announcement = Announcement.objects.create(**validated_data)
        # announcement.category = category_obj
        # announcement.user = user
        ann=Announcement(**validated_data,user=user,category=category_obj)
        ann.save()
        # print('-----announcement: ',announcement)
        # return announcement
        return ann

    # def update(self, instance, validated_data):
    # return  # TODO: create update function


class AnnouncementDetailSerializer(AnnouncementSerializer):
    """Serializer for announcement detail view."""

    class Meta(AnnouncementSerializer.Meta):
        fields = AnnouncementSerializer.Meta.fields + ("description",)
