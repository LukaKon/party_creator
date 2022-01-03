import stdimage
from django.db import models
from django.shortcuts import reverse
from dynamic_filenames import FilePattern

from account.models import User

from .utils.announcement import unique_slug_generator

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
    date = models.DateTimeField(auto_now=True)

    class Meta:
        index_together = (("id", "slug"),)
        ordering = ("-date",)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug_generator(self)
        super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        ann = Announcement.objects.get(pk=self.pk)
        for img in ann.image.all():
            img.delete()
        super().delete()

    def get_absolute_url(self):
        return reverse("announcement:announcement_details", kwargs={"slug": self.slug})

    def __str__(self):
        return self.title


class Multimedia(models.Model):
    announcement = models.ForeignKey(
        Announcement,
        verbose_name="announcement_%(class)ss",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="%(class)s",
    )
    event_type = models.OneToOneField(
        EventType,
        verbose_name="%(class)s",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def __str__(self):
        return str(self.pk)

    class Meta:
        abstract = True


class Image(Multimedia):
    """Pictures attached to announcement."""

    image = stdimage.StdImageField(
        null=True,
        blank=True,
        upload_to=upload_to_pattern,
        variations={
            "large": (800, 600),
            "medium": (640, 480),
            "small": (480, 320),
            "thumbnail": (100, 100, True),
        },
        delete_orphans=True,
        verbose_name="images",
    )
    # announcement = models.ForeignKey(
    #     Announcement,
    #     verbose_name="announcement_image",
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=True,
    #     related_name="image",
    # )
    # event_type = models.OneToOneField(
    #     EventType,
    #     verbose_name="event_type_image",
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=True,
    # )
    is_main = models.BooleanField(default=False, null=True)  # is image main - for front


class Movie(Multimedia):
    """Movie attached to announcement."""

    movie = models.FileField(
        null=True,
        upload_to=upload_to_pattern,
        # delete_orphans=True,
        verbose_name="movies",
    )


class Newsletter(models.Model):
    """Collect emails."""

    email = models.EmailField(max_length=250, unique=True)

    def __str__(self):
        return self.email
