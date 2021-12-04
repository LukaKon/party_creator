from django.db import models
from account.models import User


class FormModel(models.Model):
    form_party = models.JSONField()
    is_open = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
