from django.test import TestCase
from account.models import User
from .models import Announcement,ServiceCategory,EventType

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class TestCreateAnnouncement(TestCase):
    @classmethod
    def setup_test_data(cls):
        test_category=ServiceCategory.objects.create(name='lokal')
        test_user=User.objects.create(email='lk@lk.lk',password='tester123')
        # test_event_type=EventType.objects.create()
        test_announcement=Announcement.objects.create(pk=1,title='Impra',description='wspaniała sala',slug='sala-weselna', user=test_user,category=test_category, event_type='wesele',city='Brzeg')

    def test_announcement_content(self):
        ann=Announcement.objects.get(pk=1)
        cat=ServiceCategory.objects.get(pk=1)

        user=f'{ann.user}'
        title=f'{ann.title}'
        desc=f'{ann.description}'
        # slug=f'{ann.slug}'
        city=f'{ann.city}'

        self.assertEqual(user, 'lk@lk.lk')
        self.assertEqual(title, 'Impra')
        self.assertEqual(desc, 'wspaniała sala')
        # self.assertEqual(slug,'sala-weselna')
        self.assertEqual(city, 'Brzeg')
        self.assertEqual(str(ann), 'Impra')
        self.assertEqual(str(cat), 'lokal')

class AnnouncementTest(APITestCase):
    def test_view_announcement(self):
        url=reverse('announcement:ann_list')
        response=self.client.get(url,format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)