from django.contrib import admin

from .models import Announcement, EventType, Image, Newsletter, ServiceCategory

# class ImageInline(admin.TabularInline):
#     model=ann.AnnouncementImage

# @admin.register(ann.Announcement)
# class AnnouncementAdmin(admin.ModelAdmin):
#     inlines=[
#         ImageInline
#     ]

admin.site.register(Announcement)
admin.site.register(ServiceCategory)
admin.site.register(Image)
admin.site.register(EventType)
admin.site.register(Newsletter)
