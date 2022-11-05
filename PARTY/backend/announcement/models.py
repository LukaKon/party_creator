from django.conf import settings
from django.db import models
from django.shortcuts import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from dynamic_filenames import FilePattern

import stdimage
import uuid as uuid_lib

from .utils.announcement import unique_slug_generator


upload_to_pattern = FilePattern(
    filename_pattern="{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}"
)


class TimeStampedModel(models.Model):
    """
        An abstract base class model that provides
        self updating ''created'' and ''modified'' fields.
    """
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(models.Model):
    """Category(type) of announcement. e.g. local, photograph etc."""

    MUSIC = 'MU'
    CATTERING = 'CA'
    PHOTOGRAPH = 'PH'
    LOCAL = 'LO'
    ANIMATOR = 'AN'

    CATEGORY_NAME = (
        # ("muzyka", "music"),
        # ("cattering", "cattering"),
        # ("fotograf", "photograph"),
        # ("lokal", "local"),
        # ("animator", "animator"),

        (MUSIC, _("muzyka")),
        (CATTERING, _("cattering")),
        (PHOTOGRAPH, _("fotograf")),
        (LOCAL, _("lokal")),
        (ANIMATOR, _("animator")),
    )

    name = models.CharField(
        max_length=2,
        choices=CATEGORY_NAME,
    )
    uuid = models.UUIDField(
        db_index=True,
        default=uuid_lib.uuid4,
        editable=False,
    )

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _("categories")

    def __str__(self):
        # return f"{self.name}"
        return self.get_name_display()


# class EventType(models.Model):
# """Event type. e.g weddings, baptism etc."""

# DEFAULT = "default"
# WEDDING = "wedding"
# BAPTISM = "baptism"
# INTEGRATION = "integration"
# EVENT = [
#     (DEFAULT, _("default")),
#     (WEDDING, _("Wedding...")),
#     (BAPTISM, _("Baptism...")),
#     (INTEGRATION, _("Integration...")),
# ]

# name = models.CharField(
#     max_length=30,
#     choices=EVENT,
# )  # default=DEFAULT)

# #     name = models.CharField(max_length=100)
# #     photo = models.ForeignKey(
# #         "Image", verbose_name="event_type_image", on_delete=models.SET_NULL, null=True
# #     )
# #     category = models.ManyToManyField(ServiceCategory, related_name="event_types")

# def __str__(self):
#     return self.name


class AnnouncementManager(models.Manager):
    """Announcement manager."""

    def main_page_ann(self, **kwargs):
        return self.filter(updated__lte=timezone.now(), **kwargs) \
            .order_by('-updated')[:9]


class Announcement(TimeStampedModel):
    """Announcement object."""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='announcements'
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=False)
    slug = models.SlugField(unique=True)
    uuid = models.UUIDField(  # Used by the API to look up the record
        db_index=True,
        default=uuid_lib.uuid4,
        editable=False,
    )
    category = models.ManyToManyField(Category, related_name="categories")
    is_active = models.BooleanField(default=True)

    objects = AnnouncementManager()

    class Meta:
        index_together = (("id", "slug"),)
        ordering = ("-created",)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug_generator(self)
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        announcement = Announcement.objects.get(pk=self.pk)
        for img in announcement.image.all():
            img.delete()
        for mov in announcement.movie_url.all():
            mov.delete()
        super().delete()

    def get_absolute_url(self):
        return reverse(
            "announcement:announcement_details",
            kwargs={"slug": self.slug}
        )

    def __str__(self):
        return self.title


class Multimedia(TimeStampedModel):
    announcement = models.ForeignKey(
        Announcement,
        verbose_name="announcement_%(class)ss",
        on_delete=models.CASCADE,
        related_name="%(class)ss",
    )
    uuid = models.UUIDField(
        db_index=True,
        default=uuid_lib.uuid4,
        editable=False,
    )

    class Meta:
        abstract = True


class Image(Multimedia):
    """Pictures attached to announcement."""

    image = stdimage.StdImageField(
        # null=True,
        # blank=True,
        upload_to=upload_to_pattern,
        variations={
            "large": (800, 600),
            "medium": (640, 480),
            "small": (480, 320),
            "thumbnail": (100, 100, True),
        },
        delete_orphans=True,
        verbose_name="images",
        default="media/default.jpg",
    )
    # is image main - for front
    is_main = models.BooleanField(default=False, null=True)

    def __str__(self):
        return str(self.image)


class Favourite(models.Model):

    user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user_favourites')
    announcement = models.ManyToManyField(Announcement, related_name='announcement_favourites')
    
    
class Movie(Multimedia):
    """Movie attached to announcement."""
    
    movie_url = models.URLField()

    def __str__(self):
        return str(self.movie_url)


class Views(models.Model):

    uuid_or_email = models.CharField(
        max_length=240,
        db_index=True,
        editable=False,
    )
    announcement = models.ForeignKey(
        Announcement,
        related_name='views',
        on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ['uuid_or_email', 'announcement']
