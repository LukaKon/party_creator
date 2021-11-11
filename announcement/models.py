import stdimage
from django.db import models
from dynamic_filenames import FilePattern

from account.models import User

upload_to_pattern = FilePattern(
    filename_pattern="{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}"
)


class Category(models.Model):
    name = models.CharField(max_length=250)


class Announcement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category)
    date = models.DateField(auto_now=True)
    image = stdimage.StdImageField(
        null=True,
        blank=True,
        default="deafault.jpg",
        upload_to=upload_to_pattern,
        variations={
            "large": (600, 400),
            "thumbnail": (100, 100, True),
            "medium": (300, 200),
        },
        delete_orphans=True,
    )
