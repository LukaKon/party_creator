from django.urls import path
import party_wizard.views as views

app_name = "party_wizard"

urlpatterns = [
    path("partywizard/", views.StartView.as_view(), name="party_wizard"),
    path("attractions/", views.AttractionsFormView.as_view(), name="attractions"),
]
