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
            # 'images',
            "category",
            "event_type",
            # "user",
        )
        # widgets = {
        # "user": forms.HiddenInput(),
        # }


ImageFormSet = modelformset_factory(
    model=models.Image,
    # form=AddImageForm,
    fields=("image",),
    extra=0,
    max_num=10,
    min_num=1,
    can_delete=True,
)
