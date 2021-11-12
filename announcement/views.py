from django.shortcuts import render
from django.views.generic import TemplateView, ListView

from announcement.models import Category, Announcement


class HomeView(TemplateView):
    template_name='announcement/index.html'


class CategoryListView(ListView):
    model = Category
    template_name = 'announcement/category_list.html'

