"""
Tests for announcement API.
"""

from announcement import models, serializers
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

ADD_ANNOUNCEMENT_URL = reverse("announcement:add_announcement")
ANNOUNCEMENTS_URL = reverse("announcement:announcement_list")


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
        # TODO: not sure about authentication...
        self.refresh_token = RefreshToken.for_user(self.user)
        # self.client.credentials(
        # HTTP_AUTHORIZATION=f"Bearer {self.refresh_token.access_token}"
        # )
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.refresh_token}")

        # print(
        #     "client: ",
        #     self.user,
        #     self.client.credentials(
        #         HTTP_AUTHORIZATION=f"Bearer {self.refresh_token.access_token}"
        #     ),
        #     self.refresh_token,
        # )
        # self.client.force_authenticate(
        # user=self.user, token=self.refresh_token.access_token
        # )

    def test_retrive_announcements(self):
        """Test retrieving a list of announcements."""
        create_announcement(user=self.user)  # create announcement
        create_announcement(user=self.user)

        res = self.client.get(ANNOUNCEMENTS_URL)
        # print("data: ", res.data)

        announcements = models.Announcement.objects.all().order_by("-id")
        serilizer = serializers.AnnouncementSerializer(announcements, many=True)
        # print("ser: ", serilizer.data)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serilizer.data)

    def test_announcement_list_limited_to_user(self):
        """Test list of announcements is limited to authenticated user."""
        other_user = get_user_model().objects.create(
            email="other@example.com",
            password="pass12345",
        )
        create_announcement(user=other_user)
        create_announcement(user=self.user)

        res = self.client.get(ANNOUNCEMENTS_URL)

        announcements = models.Announcement.objects.filter(user=self.user)
        serializer = serializers.AnnouncementSerializer(announcements, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    # def test_create_announcement(self):
    # """Test create announcement."""

    # res = self.client.post(ADD_ANNOUNCEMENT_URL)
    # print("data: ", res.data)

    # # TODO: same situation: it returns for some reason 405...
    # self.assertEqual(res.status_code, status.HTTP_200_OK)
