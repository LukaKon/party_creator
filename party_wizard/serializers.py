from party_wizard.models import FormModel
from account.models import User

from rest_framework import serializers


class FormModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FormModel
        fields = ("form_party", "is_open")
