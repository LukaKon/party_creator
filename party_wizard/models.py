# from django.db import models
from django.contrib.gis.db import models
from account.models import User
from announcement.models import ServiceCategory


class FormModel(models.Model):
    name = models.CharField(max_length=250)
    categories = models.ManyToManyField(ServiceCategory)
    is_open = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    form_party=models.JSONField(null=True, default=dict)


class Shop(models.Model):
    name = models.CharField(max_length=100)
    location = models.PointField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
