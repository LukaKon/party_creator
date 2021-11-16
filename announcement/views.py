from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views import generic

from announcement import forms
import announcement
from announcement.models import Announcement, AnnouncementImage, Category


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
                send_mail(subject, message, "admin@example.com",
                          ["admin@example.com"])
            except BadHeaderError:
                return HttpResponse("Invalid header found.")
            return redirect("announcement:home")

        form = ContactForm()
        return render(request, "announcement/contact.html", {"form": form})


class CategoryListView(generic.ListView):
    model = Category
    template_name = "announcement/category_list.html"


class AnnouncementListView(generic.ListView):
    """List of announcements."""

    model = Announcement
    template_name = "announcement/announcement_list.html"


class DetailsAnnouncementView(generic.DetailView):
    """Announcemen details."""

    model = Announcement
    template_name = "announcement/announcement_details.html"


class AddAnnouncementView(LoginRequiredMixin, generic.CreateView):
    model = Announcement
    template_name = "announcement/add_announcement.html"

    form_class = forms.AddAnnouncementForm
    image_formset = forms.ImageFormSet

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        context["form"] = self.form_class(initial={"user": user.id})

        context['formset'] = self.image_formset
        return context

    def post(self, request, *args, **kwargs):
        # form = self.get_form()
        announcement_form = self.form_class(request.POST)
        images_set = self.image_formset(request.POST, request.FILES)

        if announcement_form.is_valid() and images_set.is_valid():
            announcement_obj = announcement_form.save()

            for form in images_set.cleaned_data:
                if form:
                    image = form['image']
                    AnnouncementImage.objects.create(
                        image=image, announcement=announcement_obj)
            return redirect('announcement:home')

        return render(request,
                      self.template_name,
                      context={
                          'form': self.form_class,
                          'formset': self.image_formset
                      })
