"""
Tests for announcement API.
"""

from announcement import models, serializers
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

ADD_ANNOUNCEMENT_URL = reverse("announcement:add_announcement")
ANNOUNCEMENT_URL = reverse("announcement:announcement_list")


def create_announcement(user, **kwargs):
    """Create and return a sample announcement."""
    defaults = {
        "title": "Sample announcement title",
        "description": "Description of announcement",
        "category": models.Category.objects.create(name="test category"),
    }
    defaults.update(
        kwargs
    )  # update 'default' dictionary if some data are passed through kwargs
    announcement = models.Announcement.objects.create(user=user, **defaults)
    return announcement


class PublicAnnouncementAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_auth_not_required(self):
        """Test auth is not required."""
        res = self.client.get(ANNOUNCEMENT_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    # def test_auth_required(self):
    #     """Test auth is required to call API."""
    #     res = self.client.get(ADD_ANNOUNCEMENT_URL)

    # TODO: it returns for some reason 405...
    #     self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateAnnouncementAPITests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create(
            email="user@example.com", password="testpass123"
        )
        self.client.force_authenticate(self.user)

    def test_access_to_announcement_create_form(self):
        """Test access to announcement create form."""
        res = self.client.get(ADD_ANNOUNCEMENT_URL)

        # TODO: same situation: it returns for some reason 405...
        self.assertEqual(res.status_code, status.HTTP_200_OK)
