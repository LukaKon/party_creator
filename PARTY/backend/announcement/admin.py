from django.contrib import admin

from . import models


# admin.site.register(Announcement)
@admin.register(models.Announcement)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "created")
    prepopulated_fields = {
        "slug": ("title",),
    }


admin.site.register(models.Image)

# admin.site.register(models.ServiceCategory)