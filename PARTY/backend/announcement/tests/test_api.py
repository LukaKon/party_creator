"""
Tests for announcement API.
"""

from announcement import models, serializers
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

# ADD_ANNOUNCEMENT_URL = reverse("announcement:announcement-detail")
ANNOUNCEMENT_URL = reverse("announcement:announcement-list")
CATEGORY_URL = reverse("announcement:category-list")
IMAGE_URL = reverse("announcement:image-list")


def create_user(**params):
    """Create and return a user."""
    return get_user_model().objects.create(**params)


def ann_detail_url(announcement_slug):
    """Create and return announcement detail URL."""
    return reverse("announcement:announcement-detail", args=[announcement_slug])


def cat_detail_url(category_uuid):
    """Create and return category detail URL."""
    return reverse("announcement:category-detail", args=[category_uuid])


def create_category(**kwargs):
    """Create and return a sample category."""
    defaults = {
        "name": "Sample category name",
    }
    defaults.update(kwargs)
    category = models.Category.objects.create(**defaults)
    return category


def create_announcement(user, **kwargs):
    """Create and return a sample announcement."""
    defaults = {
        "title": "Sample announcement title",
        "description": "Description of announcement",
        "category": models.Category.objects.create(name="test category"),
    }
    defaults.update(
        kwargs
    )  # update 'default' dictionary if some data are passed through kwargs
    announcement = models.Announcement.objects.create(user=user, **defaults)
    return announcement


def create_image(announcement, **kwargs):
    """Create and return a sample image."""
    defaults = {
        # "image": "/media/default.jpg",
    }
    defaults.update(kwargs)
    image = models.Image.objects.create(announcement=announcement, **defaults)
    return image


class PublicCategoryAPITest(TestCase):
    """ Test unauthenticated API request. """

    def setUp(self):
        self.client = APIClient()

    def test_auth_not_required(self):
        """Test auth is not required."""
        res = self.client.get(CATEGORY_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_categories_list(self):
        """Test get categories list."""
        create_category()
        create_category()

        res = self.client.get(CATEGORY_URL)

        categories = models.Category.objects.all()
        serializer = serializers.CategorySerializer(categories, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_category_detail(self):
        """Test get category detail."""
        category = create_category()

        url = cat_detail_url(category_uuid=category.uuid)
        res = self.client.get(url)

        serializer = serializers.CategorySerializer(category)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)


class PublicAnnouncementAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def NOtest_auth_not_required(self):
        """Test auth is not required."""
        res = self.client.get(ANNOUNCEMENT_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def NOtest_get_announcement_list_for_unauth_user(self):
        """Test get announcement list for anonymous user."""
        user = create_user(
            email="test@test.com",
            password="testpass123",
        )
        create_announcement(user)
        create_announcement(user)

        announcements = models.Announcement.objects.all().order_by("id")
        serializer = serializers.AnnouncementSerializer(announcements, many=True)

        res = self.client.get(ANNOUNCEMENT_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)


class PrivateAnnouncementAPITests(TestCase):
    """Test authenticated API requests."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="user@example.com",
            password="testpass123",
        )
        self.refresh_token = RefreshToken.for_user(self.user)
        ref_token = self.refresh_token.access_token
        self.client.credentials(HTTP_AUTHORIZATION=f"JWT {ref_token}")
        self.client.force_authenticate(
            user=self.user  # , token=self.refresh_token.access_token
        )

    def NOtest_get_announcements_list_limited_to_auth_user(self):
        # TODO: for user profile case
        """Test get announcements list limited to auth user."""
        other_user = create_user(
            email="other@example.com",
            password="pass12345",
        )
        create_announcement(user=self.user)
        create_announcement(user=other_user)

        res = self.client.get(ANNOUNCEMENT_URL)

        announcements = models.Announcement.objects.filter(user=self.user).order_by(
            "-id"
        )
        serializer = serializers.AnnouncementSerializer(announcements, many=True)
        print("AAN:", announcements)
        print("ann: ", res.data)
        print("------------------")
        print("ser: ", serializer.data)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def NOtest_get_announcements_list(self):
        """Test get announcements list."""
        other_user = create_user(
            email="other@example.com",
            password="pass12345",
        )
        announcement = create_announcement(user=self.user)
        create_image(announcement=announcement)
        # create_announcement(user=other_user)

        res = self.client.get(ANNOUNCEMENT_URL)

        announcements = models.Announcement.objects.all().order_by("id")
        serializer = serializers.AnnouncementSerializer(announcements, many=True)
        print()
        print("+++res: ", res.data)
        print("+++ser: ", serializer.data)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def NOtest_get_announcement_detail(self):
        """Test get announcement detail."""
        announcement = create_announcement(user=self.user)

        url = ann_detail_url(announcement_slug=announcement.slug)
        res = self.client.get(url)

        serializer = serializers.AnnouncementDetailSerializer(announcement)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_announcement(self):
        """Test creating an announcement."""
        category = models.Category.objects.create(name="test category")
        payload = {
            "title": "Sample announcement title",
            "description": "Description of announcement",
            "category": category.uuid,
            "user": self.user.email,
        }
        # test = self.client.get(ANNOUNCEMENT_URL)
        res = self.client.post(ANNOUNCEMENT_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        ann = models.Announcement.objects.get(id=res.data["id"])

        for k, v in payload.items():
            if k == "category":
                self.assertEqual(getattr(ann, k).uuid, v)
            elif k == "user":
                self.assertEqual(getattr(ann, k).email, v)
            else:
                self.assertEqual(getattr(ann, k), v)

            # self.assertEqual(ann.user, self.user)


class PublicImageAPITest(TestCase):
    """Test unauthenticated API request."""

    def setUp(self):
        self.client = APIClient()

    def NOtest_get_images_list(self):
        """Test get images list."""
        user = create_user(email="test@test.com", password="testpass123")
        announcement = create_announcement(user)
        create_image(announcement)
        create_image(announcement)

        res = self.client.get(IMAGE_URL)

        images = models.Image.objects.all().order_by("id")
        serializer = serializers.ImageSerializer(images, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)


class PrivateImageAPITest(TestCase):
    """Test authenticated API request."""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="user@example.com",
            password="testpass123",
        )
        self.refresh_token = RefreshToken.for_user(self.user)
        ref_token = self.refresh_token.access_token
        self.client.credentials(HTTP_AUTHORIZATION=f"JWT {ref_token}")
        self.client.force_authenticate(
            user=self.user  # , token=self.refresh_token.access_token
        )

    def NOtest_create_image(self):
        """Test create an image"""
        announcement = create_announcement(self.user)
        # create_image(announcement)
        payload = {
            "announcement": announcement,
            "is_main": False,
        }

        res = self.client.post(IMAGE_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
