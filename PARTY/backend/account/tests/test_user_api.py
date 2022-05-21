"""
Tests for the user API.
"""
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

CREATE_USER_URL = reverse("account:auth_register")


def create_user(**kwargs):
    """Create and return a new user."""
    return get_user_model().objects.create_user(**kwargs)


# Public - for unauthenticated user - not loggedin
class PublicUserAPITests(TestCase):
    """Test the public features of the user API."""

    def setUp(self):
        self.client = APIClient()

    def test_create_user_success(self):
        """Test creating a user is successful."""
        payload = {
            "email": "user@example.com",
            "password": "testpass123",
            "password2": "testpass123",
            # "is_moderator": True,
            # "is_firma": False,
            # "image": "",
            # "image": "default.jpg",
        }
        res = self.client.post(
            CREATE_USER_URL, payload
        )  # post data and create the test user

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=payload["email"])
        self.assertTrue(user.check_password(payload["password"]))
        self.assertIsNot("password", res.data)

    def test_user_with_email_exist_error(self):
        """Test an error returned if user with email exists."""
        # Checking if new created user has email that exist ind database.

        payload = {
            "email": "user@example.com",
            "password": "testpass123",
            "is_moderator": True,
            "is_firma": False,
            "image": "default.jpg",
        }
        create_user(**payload)
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short_error(self):
        """Test an error returned when the password is to short - less than 5 chars."""
        payload = {
            "email": "user@example.com",
            "password": "test",  # too short password
            "is_moderator": True,
            "is_firma": False,
            "image": "default.jpg",
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        # check if user with too short password was created
        user_exists = get_user_model().objects.filter(email=payload["email"]).exists()

        self.assertFalse(user_exists)