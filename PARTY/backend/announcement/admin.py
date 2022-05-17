from django.contrib import admin

from . import models


@admin.register(models.Announcement)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "created")
    prepopulated_fields = {
        "slug": ("title",),
    }


admin.site.register(models.Category)
admin.site.register(models.Image)
