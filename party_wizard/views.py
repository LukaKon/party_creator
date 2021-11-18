from django.shortcuts import render
from django.views.generic import View

from datetime import datetime

import party_creator.settings
import googlemaps
from pprint import pprint
gmaps = googlemaps.Client(key=party_creator.settings.GOOGLE_API_KEY)

class StartView(View):
    def get(self, request, *args, **kwargs):

        return render(request, template_name='party_wizard/party_wizard_base.html')

    def post(self, request, *args, **kwargs):
        data = request.POST.get()
        print(data)
        return render
