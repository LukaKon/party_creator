from rest_framework import serializers

from account.models import User
from party_wizard.models import FormModel


class FormModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormModel
        fields = ("name", "categories", "is_open", "user", "form_party")


class GoogleNearbySearchSerializer(serializers.Serializer):
    data = serializers.JSONField()
