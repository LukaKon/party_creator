from pprint import pprint

import googlemaps
from django.shortcuts import redirect, render
from django.views.generic import CreateView, View
from rest_framework import generics

import party_creator.settings
from account.models import User
from announcement.models import EventType, Image
from party_wizard.models import FormModel
from party_wizard.serializers import FormModelSerializer

gmaps = googlemaps.Client(key=party_creator.settings.GOOGLE_API_KEY)


"""API VIEWS"""


class UpdateFormView(generics.UpdateAPIView):
    queryset = FormModel.objects.all()
    serializer_class = FormModelSerializer


class CreateFormView(generics.CreateAPIView):
    queryset = FormModel.objects.all()
    serializer_class = FormModelSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


"""PRIMARY VIEWS"""


class ChooseEventView(View):
    def get(self, request, *args, **kwargs):
        event_types = EventType.objects.all()
        context = {
            "event_types": event_types,
        }

        return render(
            request,
            template_name="party_wizard/choose_event.html",
            context=context,
        )

    def post(self, request, *args, **kwargs):
        event_pk = request.POST.get("event_pk")
        self.request.session["event_pk"] = event_pk
        return redirect("party_wizard:choose_categories")


class ChooseCategoriesView(View):
    def get(self, request, *args, **kwargs):
        event = EventType.objects.get(pk=self.request.session["event_pk"])
        service_categories = event.category.all()
        context = {"service_categories": service_categories}

        return render(
            request,
            template_name="party_wizard/choose_categories.html",
            context=context,
        )

    def post(self, request, *args, **kwargs):
        categories = self.request.POST.getlist("categories")
        print(categories)
        self.request.session["categories"] = categories

        return redirect("party_wizard:list_to_do")


class ListToDoView(View):
    def get(self, request):
        categories = self.request.session["categories"]
        categories = [category.lower() for category in categories]

        return render(
            request, "party_wizard/list_to_do.html", {"categories": categories}
        )


class RestaurantFormView(View):
    def get(self, request):

        context = {"api_key": party_creator.settings.GOOGLE_API_KEY}
        return render(request, "party_wizard/restaurant_form.html", context=context)

        # meters = 10 * 1000
        # print(meters)
        # response = gmaps.places(query="Wroclaw")
        # print(response)
        # location = response.get("results")["geometry"]["location"]
        # restaurants = gmaps.places_nearby(
        #     location=(location["lat"], location["lng"]),
        #     type="restaurant",
        #     radius=meters,
        # )
        # restauracje = []
        # for restaurant in restaurants["results"]:
        #     restauracje.append(restaurant.get("name"))
        #     print(restaurant)
