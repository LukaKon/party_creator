from django.contrib.auth import views as auth_views
from django.urls import path,re_path
from django.views.generic import TemplateView

from announcement import views

app_name = "announcement"

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("contact/", views.ContactView.as_view(), name="contact"),
    # contact with administration
    path("category/", views.CategoryListView.as_view(), name="category_list"),
    # announcement
    path(
        "add_announcement/",
        views.AddAnnouncementView.as_view(),
        name="add_announcement",
    ),
    path(
        "announcement_details/<slug:slug>/",
        views.DetailsAnnouncementView.as_view(),
        name="announcement_details",
    ),
    path(
        "update_announcement/<slug:slug>/",
        views.UpdateAnnouncementView.as_view(),
        name="update_announcement",
    ),
    path(
        "delete_announcement/<slug:slug>/",
        views.DeleteAnnouncementView.as_view(),
        name="delete_announcement",
    ),
    # path("announcement_list/"),
    path('react/', TemplateView.as_view(template_name='index.html')),

    # api
    path('api/',views.AnnouncementAPIList.as_view(),name='anndetail'),
    path('api/<int:pk>/',views.AnnouncementAPIDetails.as_view(), name='annlist'),
    # path('api/<slug:slug>/',views.AnnouncementAPIDetails.as_view(), name='annlist'),

]
