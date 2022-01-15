import random

from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render, reverse
from django.urls import reverse_lazy
from django.views import generic

from announcement import forms

from .models import Announcement, EventType, Image, Movie, ServiceCategory
from .utils.announcement import mixins


class HomeView(generic.FormView):
    """Home page."""

    template_name = "announcement/index.html"
    form_class = forms.SearchForm
    newsletter_form = forms.NewsletterForm

    @staticmethod
    def sample_generator(query, samp=3):
        if query.count() <= samp:
            return query
        else:
            return random.sample(list(query), k=samp)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        slider_images = Image.objects.filter(announcement_id__gt=0)
        context["slider_images"] = self.sample_generator(slider_images, samp=2)

        # TODO: events type names change to english names in this view and database
        weddings = Image.objects.filter(announcement__event_type__name="wesele")
        context["weddings"] = self.sample_generator(weddings)

        business = Image.objects.filter(announcement__event_type__name="integracja")
        context["business"] = self.sample_generator(business)

        party = Image.objects.filter(announcement__event_type__name="party")
        context["party"] = self.sample_generator(party)

        context["newsletter"] = self.newsletter_form
        return context

    def post(self, request, *args, **kwargs):
        newsletter = self.newsletter_form(request.POST)
        if newsletter.is_valid():
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
    """Announcement details."""

    model = Announcement
    template_name = "announcement/announcement_details.html"
    context_object_name = "announcement"

    def get_context_data(self, **kwargs):
        context = super(DetailsAnnouncementView, self).get_context_data(**kwargs)
        user = self.request.user.pk
        context["owner_announcements"] = Announcement.objects.filter(user=user)
        return context


class AddAnnouncementView(LoginRequiredMixin, generic.CreateView):
    model = Announcement
    template_name = "announcement/add_announcement.html"

    form_class = forms.AddAnnouncementForm

    def post(self, request, *args, **kwargs):

        announcement_form = self.get_form()
        images_set = request.FILES.getlist("images")
        main_image_selector = request.POST.get("main_image")

        if announcement_form.is_valid():
            announcement = announcement_form.save(commit=False)
            announcement.user = self.request.user
            announcement.save()

            for counter, image in enumerate(images_set):
                if counter == int(main_image_selector):
                    is_main = True
                else:
                    is_main = False

                Image.objects.create(
                    image=image,
                    announcement=announcement,
                    is_main=is_main,
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

    def get_queryset(self):
        queryset = Announcement.objects.filter(user_id=self.request.user.id)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        announcement = self.get_object()
        context["images"] = Image.objects.filter(announcement=announcement)
        context["movies"] = Movie.objects.filter(announcement=announcement)
        return context

    def form_valid(self, form):
        # images from form
        existing_images = self.request.POST.getlist("all_images")
        # existing_images=self.get_object().image.all()
        images_set = self.request.FILES.getlist("images")
        images_del = self.request.POST.getlist("img[]")
        main_image_selector = self.request.POST.get("main_image")

        # movies from form
        # existing_movies=self.request.POST.getlist('all_movies')
        # movies_set=self.request.FILES.getlist('movies')
        # movies_del=self.requset.POST.getlist('mov[]')

        # Convert main_iamage_selector to int
        if main_image_selector == None:
            main_image_selector = 0
        else:
            main_image_selector = int(main_image_selector)

        all_images = existing_images + images_set

        if existing_images:
            for image in self.get_object().image.all():
                """Save all images as not main."""
                image.is_main = False
                image.save()

            if main_image_selector <= len(existing_images):
                for counter, image in enumerate(existing_images):
                    if counter == main_image_selector:
                        image = Image.objects.get(pk=int(image))
                        image.is_main = True
                        image.save()

        if images_set:
            for counter, image in enumerate(images_set, start=len(existing_images) + 1):
                if counter == main_image_selector:
                    is_main = True
                else:
                    is_main = False
                Image.objects.create(
                    image=image,
                    announcement=self.get_object(),
                    is_main=is_main,
                )
        if images_del:
            for pk in images_del:
                Image.objects.get(pk=int(pk)).delete()

        self.object = form.save()
        return super().form_valid(form)


class DeleteAnnouncementView(
    LoginRequiredMixin, mixins.UserAccessMixin, generic.DeleteView
):
    """Remove announcement."""

    model = Announcement
    template_name = "announcement/delete_announcement.html"

    def get_success_url(self):
        """Return the URL to redirect to after processing a valid form."""
        return reverse_lazy("account:profile", kwargs={"pk": self.request.user.pk})
