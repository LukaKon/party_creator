from django.shortcuts import render, redirect
from django.views import generic
from announcement.models import Category, Announcement
from announcement import forms
from django.http import HttpResponse
from django.core.mail import send_mail, BadHeaderError
from django.contrib.auth.mixins import LoginRequiredMixin

class HomeView(generic.TemplateView):
    """Home page."""
    template_name='announcement/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["familly"] = Announcement.objects.filter(type='lokal',category__name='rodzinne')
        context['business']=Announcement.objects.filter(type='lokal',category__name='biznesowe')
        context['party']=Announcement.objects.filter(type='lokal',category__name='party')
        return context



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

        form = ContactForm()
        return render(request, "announcement/contact.html", {"form": form})


class CategoryListView(generic.ListView):
    model = Category
    template_name = 'announcement/category_list.html'

class AnnouncementListView(generic.ListView):
    model=Announcement
    template_name='announcement/announcement_list.html'

class DetailsAnnouncementView(generic.DetailView):
    pass

class AddAnnouncementView(LoginRequiredMixin,generic.CreateView):
    model=Announcement
    template_name='announcement/add_announcement.html'
    form_class=forms.AddAnnouncementForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["formset"] = forms.ImageFormSet
        user=self.request.user
        context['form'] = forms.AddAnnouncementForm(initial={'user': user.id})
        return context
