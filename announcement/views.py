from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse
from django.shortcuts import redirect, render, reverse
from django.views import generic

import announcement
from announcement import forms
from announcement.models import Announcement, Image, ServiceCategory


class HomeView(generic.FormView):
    """Home page."""

    template_name = "announcement/index.html"
    form_class = forms.SearchForm
    newsletter_form = forms.NewsletterForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # TODO: give context to main page

        #     context["familly"] = Announcement.objects.filter(
        #         type="lokal", category__name="rodzinne"
        #     )
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

        # form = ContactForm() # TODO Łukasz, nie nadpisuj bo będzie pusty formularz wysyłany.
        return render(request, "announcement/contact.html", {"form": form})


class CategoryListView(generic.ListView):
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
            print("user id: ", self.request.user.id)
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


class AnnouncementUpdateView(LoginRequiredMixin, generic.UpdateView):
    """Update announcement."""

    model = Announcement
    template_name = "announcement/update_announcement.html"
    fields = (
        "title",
        "description",
        "category",
        "event_type",
    )
