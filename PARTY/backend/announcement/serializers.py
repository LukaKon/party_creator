from rest_framework import serializers

from .models import Announcement, Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("announcement", "event_type", "image", "is_main")

class AnnouncementSerializer(serializers.ModelSerializer):
    # images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Announcement
        fields = (
            "title",
            "description",
            "slug",
            "user",
            "category",
            "event_type",
            "date",
            "images",
        )
        read_only_fields = (
            "slug",
            "category",
            "event_type",
        )
