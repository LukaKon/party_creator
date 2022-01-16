import googlemaps

from django.contrib.auth.mixins import LoginRequiredMixin

from django.shortcuts import redirect, render
from django.views.generic import CreateView, View, UpdateView, FormView
from rest_framework import generics, views
from rest_framework.response import Response

import party_creator.settings
import party_wizard.models

from announcement.models import EventType, ServiceCategory
import party_creator.settings
from party_wizard.models import FormModel
from party_wizard.serializers import FormModelSerializer, GoogleNearbySearchSerializer
import party_wizard.utils.party_wizard as utils
import announcement.utils.announcement.mixins as mixins

gmaps = googlemaps.Client(key=party_creator.settings.GOOGLE_API_KEY)

"""API VIEWS"""


class GetFormView(generics.RetrieveAPIView):
    queryset = FormModel.objects.all()
    serializer_class = FormModelSerializer


class UpdateFormView(generics.UpdateAPIView):
    queryset = FormModel.objects.all()
    serializer_class = FormModelSerializer


class CreateFormView(generics.CreateAPIView):
    queryset = FormModel.objects.all()
    serializer_class = FormModelSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


from announcement.models import Announcement
from .serializers import AnnouncementSerializer


class GoogleNearbySearch(generics.ListAPIView):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):

        data_js = self.request.data
        type_of_places = data_js.get("service_category")
        places = utils.get_places(location=data_js.get("location"),
                                  radius=data_js.get("radius"),
                                  type_of_places=type_of_places)
        return places

    # def post(self, request):
    #     data_js = request.data
    #     type_of_places = data_js.get("service_category")
    #     places = utils.get_places(location=data_js.get("location"),
    #                               radius=data_js.get("radius"),
    #                               type_of_places=type_of_places)
    #
    #     results = GoogleNearbySearchSerializer({"places": places, "type_of_places": type_of_places}).data
    #     return Response(results)


"""PRIMARY VIEWS"""


class ChooseEventView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        event_types = EventType.objects.all()
        event_lists = []
        helper = []
        count = 0

        for event in event_types:
            count += 1
            helper.append(event)
            if count == 3 or event == event_types[len(event_types) - 1]:
                event_lists.append(helper)
                helper = []
                count = 0

        form_models = FormModel.objects.filter(user_id=self.request.user.pk)
        context = {
            "event_lists": event_lists,
            "form_models": form_models
        }

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
            name=event_type.name,
            user_id=self.request.user.pk,
            is_open=True
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
        categories = super().get_object().categories.all()  # [category.name.lower() for category in super().get_object().categories.all()]
        context['categories'] = categories
        return context


class StartFormView(LoginRequiredMixin, mixins.UserAccessMixin, UpdateView):
    model = FormModel
    pk_url_kwarg = "form_model_pk"
    fields = []
    template_name = "party_wizard/start_form.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        service_category = ServiceCategory.objects.get(pk=self.kwargs["pk_servicecategory"])
        context["service_category"] = service_category
        context["api_key"] = party_creator.settings.GOOGLE_API_KEY,
        return context


from .models import Shop


class TestView(CreateView):
    model = party_wizard.models.Shop
    fields = ["name",
              'location',
              'address',
              'city']
    template_name = "party_wizard/test.html"

    def get(self, request, *args, **kwargs):
        shop = Shop.objects.all()
        context = {"shop": shop}
        return render(request, template_name="party_wizard/test.html", context=context)
