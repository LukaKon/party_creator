from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from dynamic_filenames import FilePattern

import back.utils.account as utils

# import uuid as uuid_lib

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
    # uuid=models.UUIDField(
    # db_index=True,
    # default=uuid_lib.uuid4,
    # editable=False,
    # )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


class Firma(models.Model):
    name = models.CharField(max_length=255)
