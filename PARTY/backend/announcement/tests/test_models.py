"""
Tests for models.
"""
from announcement import models
from django.contrib.auth import get_user_model
from django.test import TestCase


class ModelTest(TestCase):
    """Test models."""

    def test_create_announcement(self):
        """Test creating a announcement is successful."""
        user = get_user_model().objects.create_user(
            email="user@example.com",
            password="testpass123",
        )
        category = models.Category.objects.create(name="test category")
        announcement = models.Announcement.objects.create(
            title="Test title",
            description="Test desc.",
            user=user,
            category=category,
        )

        self.assertEqual(str(announcement), announcement.title)
