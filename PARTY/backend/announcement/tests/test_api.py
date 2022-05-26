"""
Tests for announcement API.
"""

from announcement import models, serializers
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt import utils
from rest_framework_simplejwt.tokens import RefreshToken

ADD_ANNOUNCEMENT_URL = reverse("announcement:add_announcement")
ANNOUNCEMENTS_URL = reverse(
    "announcement:announcement_list"
)  # TODO: change after applying routers - generally do smth with this ;)


def detail_url(announcement_id):
    """Create and return announcement detailc URL."""
    return reverse("announcement:announcement_detail", args=[announcement_id])


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
        res = self.client.get(ANNOUNCEMENTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    # def test_auth_required(self):
    #     """Test auth is required to call API."""
    #     res = self.client.get(ADD_ANNOUNCEMENT_URL)

    # TODO: it returns for some reason 405 - 'get' function not exist
    #     self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateAnnouncementAPITests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create(
            email="user@example.com", password="testpass123"
        )
        self.refresh_token = RefreshToken.for_user(self.user)
        ref_token = self.refresh_token.access_token
        self.client.credentials(HTTP_AUTHORIZATION=f"JWT {ref_token}")
        self.client.force_authenticate(
            user=self.user  # , token=self.refresh_token.access_token
        )

    def test_get_announcements_list(self):
        """Test get announcements list."""
        other_user = get_user_model().objects.create(
            email="other@example.com",
            password="pass12345",
        )
        create_announcement(user=self.user)
        create_announcement(user=other_user)

        res = self.client.get(ANNOUNCEMENTS_URL)

        announcements = models.Announcement.objects.filter(user=self.user)
        serializer = serializers.AnnouncementSerializer(announcements, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_announcement_detail(self):
        """Test get announcement detail."""
        announcement = create_announcement(user=self.user)

        url = detail_url(announcement_id=announcement.id)
        res = self.client.get(url)

        serializer = serializers.AnnouncementDetailSerializer(announcement)

        self.assertEqual(res.data, serializer.data)

    # def test_create_announcement(self):
    #     """Test create a list of announcement."""
    #     res = self.client.post(
    #         ADD_ANNOUNCEMENT_URL,
    #         {
    #             "title": "Sample announcement title",
    #             "description": "Description of announcement",
    #             "category": models.Category.objects.create(name="test category"),
    #         },
    #     )

    #     self.assertEqual(res.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(res.data, serializer.data)