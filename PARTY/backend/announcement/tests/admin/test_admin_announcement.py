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
        self.category = models.Category.objects.create(
            name="Test category",
        )
        self.announcement = models.Announcement.objects.create(
            title="Test title",
            description="Test description",
            user=self.admin_user,
            category=self.category,
        )

    def test_announcements_list(self):
        """Test that announcements are listet on page."""
        url = reverse("admin:announcement_announcement_changelist")
        res = self.client.get(url)
        # print("---res: ", res.content)

        self.assertContains(res, self.announcement.title)
        self.assertContains(res, self.announcement.user)
        # TODO: why this below not working???
        # self.assertContains(res, self.announcement.description)
        # self.assertContains(res, self.announcement.created)

    def test_edit_announcement_page(self):
        """Test the edit announcement page works."""
        url = reverse(
            "admin:announcement_announcement_change", args=[self.announcement.id]
        )
        res = self.client.get(url)

        self.assertEqual(res.status_code, 200)

    def test_create_announcement_page(self):
        """Test the create announcement page works."""
        url = reverse("admin:announcement_announcement_add")
        res = self.client.get(url)

        self.assertEqual(res.status_code, 200)
