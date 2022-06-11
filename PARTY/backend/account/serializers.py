"""
Serializers for the user API View.
"""
from account.models import User
from announcement.serializers import AnnouncementSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
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
        token["test"] = "test claim :)" # ,- it works localhost:8000/account/login
        return token


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""

    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        trim_whitespace=False,
        style={"input_type": "password"},
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        trim_whitespace=False,
        style={"input_type": "password"},
    )

    class Meta:
        model = get_user_model()
        fields = ("email", "password", "password2")
        # password 'write_only' - security reason
        # extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def validate(self, attrs):
        """Validate and authenticate the user."""
        if len(attrs.get("password")) < 5:
            raise serializers.ValidationError(
                {"password": "Password is too short (min. 5 chars)."}
            )
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        """Create a new user."""
        user = User.objects.create_user(
            validated_data["email"],
            validated_data["password"],
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""

    announcements = AnnouncementSerializer(many=True)

    class Meta:
        model = get_user_model()
        fields = ('email', 'is_firma', 'announcements')
