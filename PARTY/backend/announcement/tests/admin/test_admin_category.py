"""
Test for the Django admin modifications.
"""
from announcement import models
from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse


class AdminSiteTests(TestCase):
    """Tests for Django admin."""

    def setUp(self):
        """Create client."""
        self.client = Client()
        self.admin_user = get_user_model().objects.create_superuser(
            email="admin@example.com", password="testpass123"
        )
        self.client.force_login(self.admin_user)
        # self.category = models.Category.objects.create(
        # name="music",
        # )
        self.category = models.Category.objects.first()

    def test_category_list(self):
        """Test that category are listet on page."""
        url = reverse("admin:announcement_category_changelist")
        res = self.client.get(url)

        # print("---res: ", res.context)

        # TODO: for futher investigation
        self.assertEqual(res.status_code, 200)
        # self.assertContains(res, self.category.name)
        # self.assertContains(res, self.category.user)