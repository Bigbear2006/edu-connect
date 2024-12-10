from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api import views

router = DefaultRouter()
router.register('courses', views.CourseViewSet, 'courses')
router.register('tasks', views.TaskViewSet, 'tasks')
router.register(
    'change-role-bids',
    views.ChangeRoleBidViewSet,
    'change-role-bids',
)

urlpatterns = [
    path('', include(router.urls)),
]
