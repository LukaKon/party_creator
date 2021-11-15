import stdimage
from django.db import models
from dynamic_filenames import FilePattern
from django.utils.translation import gettext as _
from account.models import User
from django.utils.text import slugify
from django.shortcuts import reverse

upload_to_pattern = FilePattern(
    filename_pattern="{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}"
)


class Category(models.Model):
    """Category of announcement."""

    LOCAL = 'lokal'
    MUSIC = 'kapela'
    PHOTOGRAPH='fotograf'
    CATTERING = 'gastronomia'

    TYPE_OF_SERVICE = [
        (LOCAL, _('lokal')),
        (MUSIC, _('kapela')),
        (PHOTOGRAPH,_('fotograf')),
        (CATTERING, _('gastronomia')),
    ]


    # name = models.CharField(max_length=250)
    name=models.CharField(
        max_length=100,
        choices=TYPE_OF_SERVICE,
        default=LOCAL,
        )

    def __str__(self):
        return self.name


class EventType(models.Model):
    """Event type."""

    FAMILLY = 'rodzinne'
    BUSINESS = 'biznesowe'
    PARTY = 'party'

    TYPE_OF_OCCASION = [
        (FAMILLY, _('rodzinne')),
        (BUSINESS, _('biznesowe')),
        (PARTY, _('party')),
    ]

    name=models.CharField(
        max_length=100,
        choices=TYPE_OF_OCCASION,
        default=PARTY,
    )
    category=models.ManyToManyField(Category)

    def __str__(self):
        return self.name


class AnnouncementImage(models.Model):
    """Pictures attached to announcement."""

    image = stdimage.StdImageField(
        null=True,
        blank=True,
        upload_to=upload_to_pattern,
        variations={
            "large": (1024, 768),
            "medium": (800, 600),
            "small":(640,480),
            "thumbnail": (100, 100, True),
        },
        delete_orphans=True,
    )

    def __str__(self):
        return self.pk


class Announcement(models.Model):
    """Model of announcement."""

    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    images=models.ForeignKey(
        AnnouncementImage,
        verbose_name='announcement_images',
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category,
        verbose_name='announcement_categories',
        on_delete=models.CASCADE,
    )
    event_type = models.ManyToManyField(EventType)
    date = models.DateField(auto_now=True)

    class Meta:
        index_together = (('id', 'slug'), )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("announcement_detail", kwargs={"slug": self.slug})

    def __str__(self):
        return self.title
