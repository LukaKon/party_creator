from django.urls import path

import party_wizard.views as views

app_name = "party_wizard"

urlpatterns = [
    # API
    path(
        "update_form/<int:pk>/", views.UpdateFormView.as_view(), name="update_form_view"
    ),
    path("add_form/", views.CreateFormView.as_view(), name="add_form_view"),
    path("get_form/<int:pk>/", views.GetFormView.as_view(), name="get_form_view"),
    path("nearby/", views.GoogleNearbySearch.as_view(), name="test"),
    # PRIMARY
    path("chooseevent/", views.ChooseEventView.as_view(), name="choose_event"),
    path(
        "choosecategories/<int:pk>/",
        views.ChooseCategoriesView.as_view(),
        name="choose_categories",
    ),
    path("listtodo/<int:pk>/", views.ListToDoView.as_view(), name="list_to_do"),
    path(
        "startform/<int:form_model_pk>/<int:pk_servicecategory>/",
        views.StartFormView.as_view(),
        name="start_form",
    ),
    path("test/", views.TestView.as_view(), name="test123"),
]
