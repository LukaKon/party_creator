import random

from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse
from django.shortcuts import redirect, render, reverse
from django.urls import reverse_lazy
from django.views import generic

from announcement import forms

from .models import Announcement, Image, ServiceCategory,EventType
from .utils.announcement import mixins


class HomeView(generic.FormView):
    """Home page."""

    template_name = "announcement/index.html"
    form_class = forms.SearchForm
    newsletter_form = forms.NewsletterForm

    @staticmethod
    def sample_generator(query):
        samp = 3  # how big sample will be
        if query.count() <= samp:
            return query
        else:
            return random.sample(list(query), k=samp)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # TODO: events type names change to english names in this view and database

        # weddings = Announcement.objects.filter(event_type__name="wesele")
        weddings=EventType.objects.get(name='wesele').announcements.all()
        context["weddings"] = self.sample_generator(weddings)

        business = EventType.objects.get(name='integracja').announcements.all()
        context["business"] = self.sample_generator(business)

        party = EventType.objects.get(name='party').announcements.all()
        context["party"] = self.sample_generator(party)

        #     context["business"] = Announcement.objects.filter(
        #         type="lokal", category__name="biznesowe"
        #     )
        #     context["party"] = Announcement.objects.filter(
        #         type="lokal", category__name="party"
        #     )

        context["newsletter"] = self.newsletter_form
        return context

    def post(self, request, *args, **kwargs):
        # self.object = None
        newsletter = self.newsletter_form(request.POST)
        # breakpoint()
        if newsletter.is_valid():
            # breakpoint()
            newsletter.save()
        return redirect("announcement:home")


class ContactView(generic.FormView):
    """Sending message to service owner."""

    template_name = "announcement/contact.html"
    form_class = forms.ContactForm

    def post(self, request, *args, **kwargs):
        form = self.get_form()
        if form.is_valid():
            subject = "Question from website form."
            body = {
                "email": self.request.POST.get("email"),
                "message": self.request.POST.get("message"),
            }
            message = "\n".join(body.values())

            try:
                send_mail(subject, message, "admin@example.com", ["admin@example.com"])
            except BadHeaderError:
                return HttpResponse("Invalid header found.")
            return redirect("announcement:home")

        return render(request, "announcement/contact.html", {"form": form})


class CategoryListView(generic.ListView):
    """List of categories."""  # TODO: Do we need this???

    model = ServiceCategory
    template_name = "announcement/category_list.html"


class AnnouncementListView(generic.ListView):
    """List of announcements."""

    model = Announcement
    template_name = "announcement/announcement_list.html"


class DetailsAnnouncementView(generic.DetailView):
    """Announcemen details."""

    model = Announcement
    template_name = "announcement/announcement_details.html"
    context_object_name = "announcement"


class AddAnnouncementView(LoginRequiredMixin, generic.CreateView):
    model = Announcement
    template_name = "announcement/add_announcement.html"

    form_class = forms.AddAnnouncementForm

    def post(self, request, *args, **kwargs):

        announcement_form = self.get_form()
        images_set = request.FILES.getlist("images")

        if announcement_form.is_valid():
            announcement = announcement_form.save(commit=False)
            announcement.user = self.request.user
            announcement.save()

            for image in images_set:
                Image.objects.create(
                    image=image,
                    announcement=announcement,
                )
            return redirect(
                reverse("account:profile", kwargs={"pk": self.request.user.pk})
            )

        return render(
            request,
            self.template_name,
            context={
                "form": announcement_form,
            },
        )


class UpdateAnnouncementView(
    LoginRequiredMixin, mixins.UserAccessMixin, generic.UpdateView
):
    """Update announcement."""

    model = Announcement
    template_name = "announcement/update_announcement.html"
    fields = (
        "title",
        "description",
        "category",
        "event_type",
    )

    # def test_func(self):
    #     return self.get_object().user == self.request.user

    # def dispatch(self, request, *args, **kwargs):
    #     if not self.get_test_func()():
    # return HttpResponse("CZEGO TU SZUKASZ XDD")
    # return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Announcement.objects.filter(user_id=self.request.user.id)
        return queryset

    def get_success_url(self):
        """Return the URL to redirect to after processing a valid form."""
        return reverse_lazy("account:profile", kwargs={"pk": self.request.user.pk})


class DeleteAnnouncemenView(
    LoginRequiredMixin, mixins.UserAccessMixin, generic.DeleteView
):
    """Remove announcement."""

    model = Announcement
    template_name = "announcement/delete_announcement.html"

    def get_success_url(self):
        """Return the URL to redirect to after processing a valid form."""
        return reverse_lazy("account:profile", kwargs={"pk": self.request.user.pk})
