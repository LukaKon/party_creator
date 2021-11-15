from django import forms
from announcement import models
from django.forms import modelformset_factory

class ContactForm(forms.Form):
    email = forms.EmailField(max_length=100)
    message = forms.CharField(widget=forms.Textarea, max_length=2000)


class AddAnnouncementForm(forms.ModelForm):
    class Meta:
        model=models.Announcement
        fields=(
            'title',
            'description',
            # 'images',
            'category',
            'event_type',
            'user',
        )
        widgets={
            'user':forms.HiddenInput(),
        }

class AddImageForm(forms.ModelForm):
    class Meta:
        model=models.AnnouncementImage
        fields=('image',)


ImageFormSet=modelformset_factory(
    model=models.AnnouncementImage,
    fields=('image',),
    extra=1,
    max_num=10,
    min_num=0,
    can_delete=True,
    )