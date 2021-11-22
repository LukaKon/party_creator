from pprint import pprint

import googlemaps
from django.shortcuts import redirect, render
from django.views.generic import FormView, View

import party_creator.settings
from announcement.models import EventType, Image, ServiceCategory

gmaps = googlemaps.Client(key=party_creator.settings.GOOGLE_API_KEY)

class StartView(View):
    def get(self, request, *args, **kwargs):
        event_types = EventType.objects.all()
        images = Image.objects.all()
        context = {
            "event_types": event_types,
            "images": images,
        }

        return render(
            request,
            template_name="party_wizard/party_wizard_base.html",
            context=context,
        )

    def post(self, request, *args, **kwargs):
        event_pk = request.POST.get("event_pk")
        return redirect('party_wizard:attractions')


class AttractionsFormView(View):
    def get(self, request, *args, **kwargs):
        context = {'categories': ServiceCategory.objects.all()}
        return render(
            request,
            template_name='party_wizard/attractions_form.html',
            context=context,
        )

    def post(self, request, *args, **kwargs):
        location = request.POST.get("location")
        meters = int(request.POST.get("km_radius")) * 1000
        response = gmaps.places(query=location)
        location = response.get('results')[0]['geometry']['location']
        restaurants = gmaps.places_nearby(
            location=(location['lat'], location['lng']),
            type='zoo',
            radius=meters,
        )
        restauracje = []
        for restaurant in restaurants['results']:
            restauracje.append(restaurant.get('name'))

        return render(
            request,
            template_name='party_wizard/attractions_form.html',
            context={'restauracje':restauracje}
        )