from django.contrib.auth import views as auth_views
from django.urls import path, reverse_lazy

from account import views

app_name = "account"

urlpatterns = [
    path("login/", views.LoginUserView.as_view(), name="login"),
    path("logout/", views.LogoutUserView.as_view(), name="logout"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("profile/<int:pk>", views.ProfileView.as_view(), name="profile"),
    path("edit-profile/<int:pk>", views.EditProfileView.as_view(), name="edit_profile"),

    # Password reset links
    path(
        "password_change/done/",
        auth_views.PasswordChangeDoneView.as_view(
            template_name="password_reset/password_change_done.html"
        ),
        name="password_change_done",
    ),
    path(
        "password_change/",
        auth_views.PasswordChangeView.as_view(
            template_name="password_reset/password_change.html",
            success_url=reverse_lazy('account:password_change_done')
        ),
        name="password_change",
    ),
    path(
        "password_reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="password_reset/password_reset_done.html"
        ),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            success_url=reverse_lazy('account:password_reset_complete')
        ),
        name="password_reset_confirm",
    ),
    path(
        "password_reset/", auth_views.PasswordResetView.as_view(
            template_name="password_reset/password_reset_form.html",
            success_url=reverse_lazy('account:password_reset_done')
        ), name="password_reset"
    ),
    path(
        "reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="password_reset/password_reset_complete.html"
        ),
        name="password_reset_complete",
    ),
]
