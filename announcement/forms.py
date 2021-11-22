from django import forms
from django.forms import modelformset_factory, widgets

from announcement import models


class SearchForm(forms.Form):
    """Search."""

    pass


class ContactForm(forms.Form):
    """Contact form."""

    email = forms.EmailField(max_length=100)
    message = forms.CharField(widget=forms.Textarea, max_length=2000)


class NewsletterForm(forms.ModelForm):
    """Sign up for newsletter form."""

    class Meta:
        model = models.Newsletter
        fields = ("email",)


class AddAnnouncementForm(forms.ModelForm):
    """Add announcement."""

    class Meta:
        model = models.Announcement
        fields = (
            "title",
            "description",
            "category",
            "event_type",
        )
        widgets = {
            # "user": forms.HiddenInput(),
            "title": forms.TextInput(
                attrs={
                    # "label": "Tytuł:",
                    "class": "form-control",
                    "placeholder": "tytuł...",
                    "aria-label": "title",
                    "aria-describedby": "title",
                }
            ),
            "description": forms.Textarea(
                attrs={
                    "class": "form-control",
                    "placeholder": "opis...",
                    "aria-label": "description",
                    "aria-describedby": "description",
                    "cols": 30,
                    "rows": 3,
                }
            ),
            "category": forms.Select(
                attrs={
                    # "class": "form-control",
                    "class": "form-select",
                    "aria-label": "category",
                    "aria-describedby": "category",
                },
            ),
        }
