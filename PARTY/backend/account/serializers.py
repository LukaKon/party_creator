"""
Serializers for the user API View.
"""
from account.models import User
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
        token["username"] = user.username
        return token


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""

    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ("email", "password", "password2")
        # password 'write_only' - security reason
        # extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def validate(self, attrs):
        if len(attrs["password"]) < 5:
            raise serializers.ValidationError(
                {"password": "Password is too short (min. 5 chars)."}
            )
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["email"], validated_data["password"]
            # **validated_data
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""

    class Meta:
        model = get_user_model()
        fields = ("email", "is_firma")
