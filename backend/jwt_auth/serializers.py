from rest_framework.serializers import ModelSerializer

from jwt_auth.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = (
            'is_active',
            'is_staff',
            'is_superuser',
            'last_login',
            'groups',
            'user_permissions',
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'date_joined': {'read_only': True},
        }

    def create(self, validated_data):
        validated_data.pop('role')
        return User.objects.create_user(
            validated_data.pop('username', None),
            validated_data.pop('email', None),
            validated_data.pop('password', None),
            **validated_data,
        )

    def update(self, instance, validated_data):
        validated_data.pop('role')
        return super(UserSerializer, self).update(instance, validated_data)
