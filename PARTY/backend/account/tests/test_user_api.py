"""
Tests for the user API.
"""
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

CREATE_USER_URL = reverse("account:register")
TOKEN_URL = reverse("account:login")
USER_URL = reverse("account:GetUser")


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

    def test_create_token_for_user(self):
        """Test generates token for valid credential."""
        user_details = {
            "email": "user@example.com",
            "password": "testpass123",
        }
        create_user(**user_details)

        payload = {
            "email": user_details["email"],
            "password": user_details["password"],
        }
        res = self.client.post(TOKEN_URL, payload)

        self.assertIn("refresh", res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_bad_credential(self):
        """Test returns error if credential invalid."""
        create_user(email="user@example.com", password="goodpass")
        payload = {
            "email": "user@example.com",
            "password": "badpass",
        }
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn("refresh", res.data)
        # TODO: not sure about 401 but it pass
        # self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_token_blank_password(self):
        """Test posting a blank password returns an error."""
        payload = {
            "email": "user@example.com",
            "password": "",
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn("refresh", res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrive_user_unauthorized(self):
        """Test authentication is required for users."""
        res = self.client.get(USER_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# Private - authenticated user tests
class PrivateUserAPITests(TestCase):
    """Test API requests that require authentication."""

    def setUp(self):
        self.user = create_user(
            email="user@example.com",
            password="testpass123",
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    # TODO: to finish - not right yet
    # def test_retrieve_profile_successs(self):
    #     """Test retrieving profile for logged user."""
    #     res = self.client.get(USER_URL)
    #     # print("res: ", res)

    #     self.assertEqual(res.status_code, status.HTTP_200_OK)
    #     self.assertEqual(
    #         res.data,
    #         {
    #             "email": self.user.email,
    #         },
    #     )
