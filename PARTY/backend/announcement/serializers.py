from rest_framework import serializers

from .models import Announcement


class AnnouncementSerializer(serializers.ModelSerializer):
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
        )
