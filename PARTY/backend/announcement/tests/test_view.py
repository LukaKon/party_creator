from announcement import views
from announcement.models import Announcement
from django.test import TestCase
from django.urls import resolve
from rest_framework.test import APIClient


class TestView(TestCase):
    """Test views"""

    def NOtest_announcement_list_view(self):
        """ Testing listing announcement view. """
        ann = Announcement.objects.all()
        client = APIClient()
        res = client.get("/api/announcements/")

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, [*ann])

    def NOtest_announcement_list_url_resolves_to_announcement_list(self):
        ''' Test announcement_list resolves to AnnouncementListView. '''
        found = resolve('/api/announcements/')
        self.assertEqual(found.func.__name__,views.AnnouncementListView.as_view().__name__)

