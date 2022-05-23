"""
Tests for the Django admin modifications.
"""
from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse


class AdminSiteTests(TestCase):
    """Tests for Django admin."""

    def setUp(self):
        """Create user and client."""
        self.client = Client()
        self.admin_user = get_user_model().objects.create_superuser(
            email="admin@example.com",
            password="testpass123",
        )
        self.client.force_login(self.admin_user)
        self.user = get_user_model().objects.create_user(
            email="user@example.com",
            password="testpass123",
            is_moderator=True,
            is_firma=False,
            image="",
        )

    def test_users_list(self):
        """Test that users are listed on page."""
        url = reverse("admin:account_user_changelist")
        res = self.client.get(url)

        self.assertContains(res, self.user.email)
        self.assertContains(res, self.user.is_moderator)
        self.assertContains(res, self.user.is_firma)

    def test_edit_user_page(self):
        """Test the edit user page works."""
        url = reverse("admin:account_user_change", args=[self.user.id])
        res = self.client.get(url)

        self.assertEqual(res.status_code, 200)

    def test_create_user_page(self):
        """Test the create user page works."""
        url = reverse("admin:account_user_add")
        res = self.client.get(url)

        self.assertEqual(res.status_code, 200)
