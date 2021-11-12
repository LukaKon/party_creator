from django.shortcuts import render
from django.views import generic


class HomeView(generic.TemplateView):
    """Home page"""
    template_name='announcement/index.html'

class ContactView(generic.TemplateView):
    """Sending message to service owner"""
    template_name='announcement/contact.html'

    def is_valid():
        pass