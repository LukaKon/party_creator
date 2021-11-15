from django.urls import path
from announcement import views
from django.contrib.auth import views as auth_views

app_name = "announcement"

urlpatterns = [
    path('',views.HomeView.as_view(),name='home'),
    path('contact/',views.ContactView.as_view(),name='contact'),

    # contact with administration
    path('category/',views.CategoryListView.as_view(),name='category_list'),

    # announcement
    path('add_announcement/', views.AddAnnouncementView.as_view(), name='add_announcement'),

]