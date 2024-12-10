from django.urls import path

from jwt_auth import views

urlpatterns = [
    path('user/login/', views.login_view, name='user-login'),
    path(
        'user/refresh-token/',
        views.refresh_token_view,
        name='refresh-token',
    ),
    path(
        'user/register/',
        views.RegisterUserAPIView.as_view(),
        name='register-user',
    ),
    path(
        'user/tasks/completed/',
        views.UserCompletedTasksAPIView.as_view(),
        name='user-completed_tasks',
    ),
    path(
        'user/jobs-applications/',
        views.UserJobsApplicationsAPIView.as_view(),
        name='user-jobs-applications',
    ),
    path('user/info/', views.UserInfoAPIView.as_view(), name='user-info'),
    path(
        'user/<int:pk>/info/',
        views.UserDetailInfoAPIView.as_view(),
        name='user-detail-info',
    ),
    path('users/', views.UserListAPIView.as_view(), name='user-list'),
]
