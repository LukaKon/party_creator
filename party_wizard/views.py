import googlemaps
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect, render
from django.views.generic import CreateView, UpdateView, View
from rest_framework import generics, views
from rest_framework.response import Response

import announcement.utils.announcement.mixins as mixins
import party_creator.settings
import party_wizard.utils.party_wizard as utils
from announcement.models import EventType, ServiceCategory
from party_wizard.models import FormModel
from party_wizard.serializers import FormModelSerializer, GoogleNearbySearchSerializer

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
        data = utils.get_places(
            location=data_js.get("location"), radius=data_js.get("radius")
        )
        results = GoogleNearbySearchSerializer(data).data
        return Response(results)


"""PRIMARY VIEWS"""


class ChooseEventView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        event_types = EventType.objects.all()
        form_models = FormModel.objects.filter(user_id=self.request.user.pk)
        context = {"event_types": event_types, "form_models": form_models}

        return render(
            request,
            template_name="party_wizard/choose_event.html",
            context=context,
        )


class ChooseCategoriesView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        event = EventType.objects.get(pk=kwargs["pk"])
        service_categories = event.category.all()
        context = {"service_categories": service_categories}

        return render(
            request,
            template_name="party_wizard/choose_categories.html",
            context=context,
        )

    def post(self, request, *args, **kwargs):
        categories = self.request.POST.getlist("categories")
        event_type = EventType.objects.get(pk=kwargs["pk"])

        form_party = FormModel.objects.create(
            name=event_type.name, user_id=self.request.user.pk, is_open=True
        )
        for category in categories:
            form_party.categories.add(ServiceCategory.objects.get(pk=int(category)))

        return redirect("party_wizard:list_to_do", pk=form_party.pk)


class ListToDoView(LoginRequiredMixin, mixins.UserAccessMixin, UpdateView):
    model = FormModel
    template_name = "party_wizard/list_to_do.html"
    fields = []

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        categories = [
            category.name.lower() for category in super().get_object().categories.all()
        ]
        context["categories"] = categories
        return context


class StartFormView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        context = {"api_key": party_creator.settings.GOOGLE_API_KEY, "pk": kwargs["pk"]}
        return render(request, "party_wizard/start_form.html", context=context)
