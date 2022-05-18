from announcement.models import Announcement
from django.test import SimpleTestCase, TestCase
from rest_framework.test import APIClient


class TestView(TestCase):
    """Test views"""

    def test_announcement_list_view(self):
        """Testing listing announcement view."""
        ann = Announcement.objects.all()
        client = APIClient()
        res = client.get("/api/announcements/")

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, [*ann])
