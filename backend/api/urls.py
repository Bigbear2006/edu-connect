from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api import views

router = DefaultRouter()
router.register('courses', views.CourseViewSet, 'courses')
router.register('tasks', views.TaskViewSet, 'tasks')

urlpatterns = [
    path('', include(router.urls)),
]
