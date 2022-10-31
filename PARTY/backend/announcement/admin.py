"""
Django admin customization.
"""
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import Group

from . import models


class AnnouncementAdmin(admin.ModelAdmin):
    """Define the admin page for announcements."""

    ordering = ["id"]
    list_display = (
        'slug',
        "title",
        "created",
        'updated',
    )
    list_filter = ('category','user',)
    prepopulated_fields = {
        # "slug": ("title",),
    }
    fieldsets = (
        (
            _("Announcement"),
            {
                "fields": (
                    "title",
                    "description",
                )
            },
        ),
        (
            _("Categories"),
            {
                "fields": (
                    "category",
                    # 'event',
                )
            },
        ),
        (
            _("Author"),
            {"fields": ("user",)},
        ),
        (
            _("Autogenerated data"),
            {
                "fields": (
                    "slug",
                    "uuid",
                    "created",
                    'updated',
                )
            },
        ),
    )
    readonly_fields = (
        "slug",
        "uuid",
        "created",
        "updated",
    )
    add_fieldsets = (
        None,
        {
            "classes": ("wide",),
            "fields": (
                "title",
                "description",
                "slug",
                "uuid",
                "user",
                "category",
            ),
        },
    )


class CategoryAdmin(admin.ModelAdmin):
    """Define the admin page for category."""

    ordering = ["id"]
    list_display = ("name",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "name",
                    "uuid",
                )
            },
        ),
    )
    readonly_fields = ("uuid",)
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "name",
                    "uuid",
                ),
            },
        ),
    )


class ImageAdmin(admin.ModelAdmin):
    """Define the admin page for images."""

    ordering = ["id"]
    list_display = ("image",)
    list_filter = ('announcement',)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "image",
                    "is_main",
                    "announcement",
                    # "user",
                ),
            },
        ),
    )
    readonly_fields = [
        'uuid',
        'created',
        'updated',
    ]
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "image",
                    "is_main",
                    "announcement",
                    # 'user',
                ),
            },
        ),
    )


class MovieAdmin(admin.ModelAdmin):
    """Define the admin page for movies."""

    ordering = ["id"]
    list_display = ("movie_url",)
    list_filter = ('announcement',)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "movie_url",
                    "announcement",
                    # 'user',
                ),
            },
        ),
    )
    readonly_fields = [
        'uuid',
        'created',
        'updated',
    ]
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "movie_url",
                    "announcement",
                    # 'user',
                ),
            },
        ),
    )


class FavouriteAdmin(admin.ModelAdmin):
    """Define the admin page for favourite announcements."""

    ordering = ['id']
    # list_display = ('user', 'announcement',)
    list_display = ('id',)
    list_filter = ('user', 'announcement',)

admin.site.register(models.Announcement, AnnouncementAdmin)
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Image, ImageAdmin)
admin.site.register(models.Movie, MovieAdmin)
admin.site.register(models.Favourite, FavouriteAdmin)

admin.site.unregister(Group)

admin.site.site_header = 'Party Wizard admin page'
