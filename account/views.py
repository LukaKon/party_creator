from django.contrib.auth.views import LoginView, LogoutView, get_user_model
from django.urls import reverse_lazy
from django.views.generic import CreateView

import account.forms as forms


class RegisterView(CreateView):
    model = get_user_model()
    template_name = "account/register.html"
    form_class = forms.CreationUserForm
    success_url = reverse_lazy("account:login")


class LoginUserView(LoginView):
    template_name = "account/login.html"
    authentication_form = forms.LoginUserForm
    success_url = reverse_lazy("announcement:home")


class LogoutUserView(LogoutView):
    template_name = "account/logout.html"
    next_page = "announcement:home"
