from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import resolve
from django.http import HttpRequest

from announcement.models import Announcement
from announcement import views


class TestView(TestCase):
    """Test views"""

    def test_announcement_list_view(self):
        """Testing listing announcement view."""
        ann = Announcement.objects.all()
        client = APIClient()
        res = client.get("/api/announcements/")

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, [*ann])

    def test_announcement_list_url_resolves_to_announcement_list(self):
        '''Test announcement_list resolves to AnnouncementListView.'''
        found = resolve('/api/announcements/')
        self.assertEqual(found.func.__name__,views.AnnouncementListView.as_view().__name__)

