from rest_framework import serializers

from .models import Announcement


class AnnouncementSerializer(serializers.ModelSerializer):
    image =serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model = Announcement
        fields = (
            "id",
            "slug",
            "title",
            "description",
            'image',
            "user",
            "category",
            "event_type",
            "city",
        )
        lookup_field = "slug"
