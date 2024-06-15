"""
Serializers for the user API View.
"""
from account.models import User
from announcement.serializers import AnnouncementDetailSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        # TODO: not visible in decoding -> jwt.io
        # token["username"] = user.username
        # token["test"] = "test claim :)" # ,- it works localhost:8000/account/login
        return token


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        trim_whitespace=False,
        style={"input_type": "password"},
        # min_length=5,
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        trim_whitespace=False,
        style={"input_type": "password"},
    )

    class Meta:
        model = get_user_model()
        fields = (
            "email",
            "password",
            "password2",
            "is_moderator",
            "is_firma",
        )
        # password 'write_only' - security reason
        # extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def validate(self, data):
        """Validate and authenticate the user."""
        password = data.get("password")
        password2 = data.get("password2")
        errors = []

        # if len(password) < 5:
            # errors.append("Password is too short (min. 5 chars).")
        if password != password2:
            errors.append("Password fields didn't match (test).")

        if len(errors) > 0:
            raise serializers.ValidationError(errors)

        return data

    def create(self, validated_data):
        """Create a new user."""
        user = User.objects.create_user(
            validated_data["email"],
            validated_data["password"],
        )
        user.is_firma = validated_data['is_firma']
        user.is_moderator = validated_data['is_moderator']
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""

    announcements = AnnouncementDetailSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = (
            'id',
            'email',
            'is_firma',
            'is_moderator',
            'announcements',
            'image',
        )


class ChangePasswordSerializer(serializers.Serializer):
    model = get_user_model()
    ''' Serializer for password change endpoint '''

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
