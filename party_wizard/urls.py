from django.urls import path

import party_wizard.views as views

app_name = "party_wizard"

urlpatterns = [
    # API

    path(
        "update_form/<int:pk>/", views.UpdateFormView.as_view(), name="update_form_view"
    ),
    path("add_form/", views.CreateFormView.as_view(), name="add_form_view"),
    path("test/", views.GoogleNearbySearch.as_view(), name="test"),
    # PRIMARY

    path("chooseevent/", views.ChooseEventView.as_view(), name="choose_event"),
    path("choosecategories/", views.ChooseCategoriesView.as_view(), name="choose_categories"),

    path("listtodo/", views.ListToDoView.as_view(), name="list_to_do"),
    path("restaurantform/", views.RestaurantFormView.as_view(), name="restauracja"), # TODO Trzeba ogarnąć w jakiś sposób ten name
]
