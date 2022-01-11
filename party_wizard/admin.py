from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from .models import Shop

class ShopAdmin(LeafletGeoAdmin):
    # model = Shop
    # list_display = ['location']
    pass
admin.site.register(Shop, ShopAdmin)
