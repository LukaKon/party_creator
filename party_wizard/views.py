import googlemaps

from django.shortcuts import redirect, render
from django.views.generic import View, CreateView
from rest_framework import generics, views
from rest_framework.response import Response

from account.models import User
from announcement.models import EventType, Image
import party_creator.settings
from party_wizard.models import FormModel
from party_wizard.serializers import FormModelSerializer, GoogleNearbySearchSerializer
import party_wizard.utils.party_wizard as utils


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


class GoogleNearbySearch(views.APIView):

    def post(self, request):
        data_js = request.data
        data = utils.get_places(location=data_js.get("location"), radius=data_js.get("radius"), price_level=data_js.get("price_level"))
        results = GoogleNearbySearchSerializer(data).data
        return Response(results)


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

