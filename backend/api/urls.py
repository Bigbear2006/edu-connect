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
router.register('companies', views.CompanyViewSet, 'companies')
router.register('jobs', views.JobViewSet, 'jobs')
router.register('forums', views.ForumViewSet, 'forums')
router.register('comments', views.CommentViewSet, 'comments')
router.register(
    'jobs-applications',
    views.JobApplicationViewSet,
    'jobs-applications',
)

urlpatterns = [
    path('', include(router.urls)),
]
