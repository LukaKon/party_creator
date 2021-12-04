from django.db import models

class FormModel(models.Model):
    form_party = models.JSONField()
    is_open = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
