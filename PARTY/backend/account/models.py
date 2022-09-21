import back.utils.account as utils
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created

from dynamic_filenames import FilePattern


upload_to_pattern = FilePattern(
    filename_pattern="{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}"
)


class UserManager(BaseUserManager):
    """User Manager to create a user with email as login field"""

    def create_user(self, email, password=None, **kwargs):
        """Create, save and return a new user."""
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)  # set encrypted password
        user.save(using=self._db)  # support different databases - good practice
        return user

    def create_superuser(self, email, password, **kwargs):
        """Create and return superuser."""
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_active", True)

        if kwargs.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if kwargs.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **kwargs)


class User(AbstractUser):
    """User with email as a login field. Added flag 'is_moderator' for future."""

    username = None
    email = models.EmailField(_("email address"), unique=True)
    is_moderator = models.BooleanField(default=False)
    is_firma = models.BooleanField(default=False)
    image = utils.stdimage_save_defaultimg(
        null=True,
        blank=True,
        default="default.jpg",
        upload_to=upload_to_pattern,
        variations={
            "large": (600, 400),
            "medium": (300, 200),
            "small": (100, 100),
            "thumbnail": (30, 30, True),
        },
        delete_orphans=True,
    )

    USERNAME_FIELD = "email"  # field for authentication
    REQUIRED_FIELDS = []

    objects = UserManager()  # assign UserManager to user model

    def __str__(self):
        return self.email


class Firma(models.Model):
    name = models.CharField(max_length=255)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    email_plaintext_message = "127.0.0.1:3000/resetpassword/{}".format(reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Party Wizard"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@partywizard.local",
        # to:
        [reset_password_token.user.email]
    )
