from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated

from api.permissions import IsAdmin
from api.serializers import TaskSerializer
from jwt_auth.models import User
from jwt_auth.serializers import UserSerializer


@method_decorator(swagger_auto_schema(tags=['users']), 'post')
class RegisterUserAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@method_decorator(swagger_auto_schema(tags=['users']), 'get')
@method_decorator(swagger_auto_schema(tags=['users']), 'put')
@method_decorator(swagger_auto_schema(tags=['users']), 'patch')
class UserInfoAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


@method_decorator(
    swagger_auto_schema(
        tags=['users'],
        operation_summary='все выполненные задачи пользователя',
    ),
    'get',
)
class UserCompletedTasksAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer

    def get_queryset(self):
        return self.request.user.completed_tasks


@method_decorator(
    swagger_auto_schema(
        tags=['users'],
        operation_summary='список всех пользователей',
    ),
    'get',
)
class UserListAPIView(ListAPIView):
    permission_classes = [IsAdmin]
    queryset = User.objects.all()
    serializer_class = UserSerializer
