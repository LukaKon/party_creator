from rest_framework import serializers

from .models import Announcement
from account.models import User


class AnnouncementSerializer(serializers.ModelSerializer):
    image =serializers.StringRelatedField(many=True,read_only=True)
    user=serializers.HyperlinkedRelatedField(
        view_name='user',
        # slug_field='user',
        queryset=User.objects.all()
    )
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
