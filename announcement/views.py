from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from announcement.models import Category, Announcement


class HomeView(generic.TemplateView):
    """Home page"""
    template_name='announcement/index.html'

class ContactView(generic.TemplateView):
    """Sending message to service owner"""
    template_name='announcement/contact.html'

    def is_valid():
        pass


class CategoryListView(ListView):
    model = Category
    template_name = 'announcement/category_list.html'
