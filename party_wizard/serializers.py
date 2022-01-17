from rest_framework import serializers

from account.models import User
from announcement.models import Announcement
from party_wizard.models import FormModel


class FormModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormModel
        fields = ("name", "categories", "is_open", "user", "form_party")


class AnnouncementSerializer(serializers.ModelSerializer):
    image = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Announcement
        fields = ("title", "description", "date", "city", "image", "slug")


class GoogleNearbySearchSerializer(serializers.Serializer):
    places = serializers.JSONField()
    type_of_places = serializers.CharField(max_length=30)
