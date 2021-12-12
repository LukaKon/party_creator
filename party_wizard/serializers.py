from rest_framework import serializers

from account.models import User
from party_wizard.models import FormModel


class FormModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FormModel
        fields = ("form_party", "is_open")


class GoogleNearbySearchSerializer(serializers.Serializer):
    data = serializers.JSONField()
