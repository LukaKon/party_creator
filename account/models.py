from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.utils.translation import ugettext_lazy as _

import stdimage
from dynamic_filenames import FilePattern

upload_to_pattern = FilePattern(
    filename_pattern="{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}"
)

class UserManager(BaseUserManager):
    """User Manager to create a user with email as login field"""
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_active", True)

        if kwargs.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if kwargs.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **kwargs)


class User(AbstractUser):
    """User with email as a login field. Added flag 'is_moderator' for future. """
    username = None
    email = models.EmailField(_("email address"), unique=True)
    is_moderator = models.BooleanField(default=False)
    image = stdimage.StdImageField(
        null=True,
        blank=True,
        default='account/user/default.jpg', # TODO Łukasz, czy da się tu zrobic pattern do tego katalogu?
        upload_to=upload_to_pattern,
        variations={
            "large": (600, 400),
            "thumbnail": (100, 100, True),
            "medium": (300, 200),
        },
        delete_orphans=True,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()
