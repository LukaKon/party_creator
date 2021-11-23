import stdimage
from django.db import models
from django.shortcuts import reverse
from django.utils.text import slugify
from django.utils.translation import gettext as _
from dynamic_filenames import FilePattern

from account.models import User

from .utils import unique_slug_generator

upload_to_pattern = FilePattern(
    filename_pattern="{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}"
)


class ServiceCategory(models.Model):
    """Category(type) of announcement. e.g local, photograph etc."""

    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class EventType(models.Model):
    """Event type. e.g weddings, baptism etc."""

    name = models.CharField(max_length=100)
    photo = models.ForeignKey(
        "Image", verbose_name="event_type_image", on_delete=models.SET_NULL, null=True
    )
    category = models.ManyToManyField(ServiceCategory, related_name="event_types")

    def __str__(self):
        return self.name


class Announcement(models.Model):
    """Model of announcement."""

    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(
        ServiceCategory,
        verbose_name="announcement_categories",
        on_delete=models.CASCADE,
    )
    event_type = models.ManyToManyField(EventType, related_name="announcements")
    date = models.DateField(auto_now=True)

    class Meta:
        index_together = (("id", "slug"),)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug_generator(self)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("announcement:announcement_details", kwargs={"slug": self.slug})

    def __str__(self):
        return self.title


class Image(models.Model):
    """Pictures attached to announcement."""

    image = stdimage.StdImageField(
        null=True,
        blank=True,
        upload_to=upload_to_pattern,
        variations={
            "large": (1024, 768),
            "medium": (800, 600),
            "small": (640, 480),
            "thumbnail": (100, 100, True),
        },
        delete_orphans=True,
    )
    announcement = models.ForeignKey(
        Announcement,
        verbose_name="announcement_image",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="image",
    )
    event_type = models.OneToOneField(
        EventType,
        verbose_name="event_type_image",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def __str__(self):
        return str(self.pk)


class Newsletter(models.Model):
    """Collect emails."""

    email = models.EmailField(max_length=250, unique=True)

    def __str__(self):
        return self.email
