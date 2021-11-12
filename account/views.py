from django.contrib.auth.views import LoginView, LogoutView, get_user_model
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView

import account.forms as forms
from account.models import User


class RegisterView(CreateView):
    model = User
    template_name = "account/register.html"
    form_class = forms.CreationUserForm
    success_url = reverse_lazy("account:login")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['firma_form'] = forms.FirmaForm
        return context

    def post(self ,*args, **kwargs):
        self.object = None
        form = self.get_form()
        if form.is_valid():
            if self.request.POST.get('is_firma'):
                form_firma = forms.FirmaForm(self.request.POST)
                if form_firma.is_valid():
                    form_firma.save()
            return self.form_valid(form)
        else:
            return self.form_invalid(form)


class LoginUserView(LoginView):
    template_name = "account/login.html"
    authentication_form = forms.LoginUserForm
    success_url = reverse_lazy("announcement:home")


class LogoutUserView(LogoutView):
    template_name = "account/logout.html"
    next_page = "announcement:home"


class ProfileView(DetailView):
    model = User
    template_name = "account/profile.html"


class EditProfileView(UpdateView):
    model = User
    fields = ("image", "first_name", "last_name", "email")
    template_name = "account/edit_profile.html"

    def get_queryset(self):
        queryset = User.objects.filter(pk=self.request.user.pk)
        return queryset

    def get_success_url(self):
        return reverse_lazy('account:edit_profile', kwargs={'pk': self.request.user.pk})