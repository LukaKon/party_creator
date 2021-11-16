from django import forms
from django.forms import modelformset_factory

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
        fields = ("email", )


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
            "user",
        )
        widgets = {
            "user": forms.HiddenInput(),
        }


class AddImageForm(forms.ModelForm):
    """Add image to announcement."""
    class Meta:
        model = models.AnnouncementImage
        fields = ("image", )


FormsetImage = ImageFormSet = modelformset_factory(
    model=models.AnnouncementImage,
    form=AddImageForm,
    fields=("image", ),
    extra=1,
    max_num=10,
    min_num=1,
    can_delete=True,
)

# ImageFormSetInitial=
