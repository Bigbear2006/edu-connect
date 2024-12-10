from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh

from api.permissions import IsAdmin
from api.serializers import CompletedTaskSerializer, JobApplicationSerializer
from jwt_auth.models import User
from jwt_auth.serializers import UserSerializer

login_view = swagger_auto_schema('POST', tags=['auth'])(token_obtain_pair)
refresh_token_view = swagger_auto_schema('POST', tags=['auth'])(token_refresh)


@method_decorator(
    swagger_auto_schema(operation_summary='зарегистрировать пользователя'),
    'post',
)
class RegisterUserAPIView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@method_decorator(
    swagger_auto_schema(
        operation_summary='информация о зарегистрированном пользователе',
    ),
    'get',
)
@method_decorator(
    swagger_auto_schema(
        operation_summary='изменить информацию о '
        'зарегистрированном пользователе',
    ),
    'patch',
)
class UserInfoAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


@method_decorator(
    swagger_auto_schema(
        operation_id='auth_user_detail_info_read',
        operation_summary='информация о пользователе по его id',
    ),
    'get',
)
@method_decorator(
    swagger_auto_schema(
        operation_id='auth_user_detail_info_partial_update',
        operation_summary='изменить информацию о пользователе по его id',
    ),
    'patch',
)
class UserDetailInfoAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@method_decorator(
    swagger_auto_schema(
        operation_summary='все выполненные задачи пользователя',
    ),
    'get',
)
class UserCompletedTasksAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CompletedTaskSerializer

    def get_queryset(self):
        return self.request.user.completed_tasks


@method_decorator(
    swagger_auto_schema(operation_summary='список всех откликов пользователя'),
    'get',
)
class UserJobsApplicationsAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobApplicationSerializer

    def get_queryset(self):
        return self.request.user.applications

    def get_serializer_context(self):
        context = super(
            UserJobsApplicationsAPIView,
            self,
        ).get_serializer_context()
        context['job_detail'] = True
        return context


@method_decorator(
    swagger_auto_schema(operation_summary='список всех пользователей'),
    'get',
)
class UserListAPIView(ListAPIView):
    permission_classes = [IsAdmin]
    queryset = User.objects.all()
    serializer_class = UserSerializer
