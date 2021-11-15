from django.shortcuts import render, redirect
from django.views.generic import TemplateView, ListView, FormView
from announcement.models import Category, Announcement
from announcement import forms
from django.http import HttpResponse
from django.core.mail import send_mail, BadHeaderError


class HomeView(TemplateView):
    """Home page."""
    template_name='announcement/index.html'

class ContactView(FormView):
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

        # form = ContactForm()
        return render(request, "announcement/contact.html", {"form": form})


class CategoryListView(ListView):
    model = Category
    template_name = 'announcement/category_list.html'
