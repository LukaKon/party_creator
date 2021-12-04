from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView

import account.forms as forms
from account.models import User
from announcement.models import Announcement


class RegisterView(CreateView):
    model = User
    template_name = "account/register.html"
    form_class = forms.CreationUserForm
    success_url = reverse_lazy("account:login")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["firma_form"] = forms.FirmaForm
        return context

    def post(self, *args, **kwargs):
        self.object = None
        form = self.get_form()
        if form.is_valid():
            if self.request.POST.get("is_firma"):
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


class ProfileView(LoginRequiredMixin, DetailView):
    """Details of user account."""

    model = User
    template_name = "account/profile.html"
    context_object_name = "user_data"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.get_object().pk
        context["announcements"] = Announcement.objects.filter(user=user)
        return context


class EditProfileView(UpdateView):
    model = User
    fields = ("image", "first_name", "last_name", "email")
    template_name = "account/edit_profile.html"

    def dispatch(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.pk != self.request.user.pk:
            return HttpResponse("CZEGO TU SZUKASZ XDD")
        return super(EditProfileView, self).dispatch(request, *args, **kwargs)

    def get_success_url(self):
        return reverse_lazy("account:edit_profile", kwargs={"pk": self.request.user.pk})

    def form_valid(self, form):
        edit_user = form.save(commit=False)
        if self.request.POST.get("image-clear") != None:
            edit_user.image = "default.jpg"
        edit_user.save()
        return super().form_valid(form)
