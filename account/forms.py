from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.db import transaction
from django.utils.translation import gettext_lazy as _

from account.models import Firma, User


class CreationUserForm(UserCreationForm):
    """Create User form."""

    def __init__(self, *args, **kwargs):
        super(CreationUserForm, self).__init__(*args, **kwargs)
        self.fields["first_name"].required = False
        self.fields["last_name"].required = False
        self.fields["password1"].widget = forms.PasswordInput(
            attrs={"placeholder": "hasło..."}
        )
        self.fields["password2"].widget = forms.PasswordInput(
            attrs={"placeholder": "powtórz hasło..."}
        )

    class Meta:
        model = User
        fields = (
            "image",
            "first_name",
            "last_name",
            "email",
            "password1",
            "password2",
            "is_firma",
        )
        widgets = {
            "first_name": forms.TextInput(
                attrs={
                    "autofocus": True,
                    "class": "form-control",
                    "placeholder": "imię...",
                    "aria-label": "first_name",
                    "aria-describedby": "first_name",
                }
            ),
            "last_name": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "nazwisko...",
                    "aria-label": "last_name",
                    "aria-describedby": "last_name",
                }
            ),
            "email": forms.EmailInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "e-mail...",
                    "aria-label": "email",
                    "aria-describedby": "email",
                }
            ),
            'password1':forms.PasswordInput(
                attrs={
                    'class':'form-control',
                    # 'placeholder':'hasło...',
                    "aria-label": "password1",
                    "aria-describedby": "password1",
                }
            ),
            'password2':forms.PasswordInput(
                attrs={
                    'class':'form-control',
                    # 'placeholder':'powtórz hasło...',
                    "aria-label": "password2",
                    "aria-describedby": "password2",
                }
            ),
        }


class LoginUserForm(AuthenticationForm):
    """Login form"""

    def __init__(self, *args, **kwargs):
        super(LoginUserForm, self).__init__(*args, **kwargs)
        del self.fields["username"]

    def clean(self):
        email = self.cleaned_data.get("email")
        password = self.cleaned_data.get("password")

        if email is not None and password:
            self.user_cache = authenticate(self.request, email=email, password=password)
            if self.user_cache is None:
                raise self.get_invalid_login_error()
            else:
                self.confirm_login_allowed(self.user_cache)
        return self.cleaned_data

    email = forms.EmailField(
        widget=forms.EmailInput(attrs={"autofocus": True, "placeholder": "E-Mail"})
    )
    password = forms.CharField(
        label=_("Password"),
        strip=False,
        widget=forms.PasswordInput(
            attrs={"autocomplete": "current-password", "placeholder": "Hasło"}
        ),
    )

    field_order = ["email", "password"]


class FirmaForm(forms.ModelForm):
    class Meta:
        model = Firma
        fields = ("name",)
