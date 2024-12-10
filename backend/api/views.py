from drf_yasg.utils import no_body, swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api import models, serializers


class CourseViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer

    @swagger_auto_schema(
        'GET',
        operation_summary='все задачи курса',
        responses={200: serializers.TaskSerializer(many=True)},
    )
    @action(['GET'], True, 'tasks', 'course-tasks')
    def tasks(self, request: Request, pk: int):
        tasks = models.Task.objects.filter(course_id=pk)
        data = serializers.TaskSerializer(instance=tasks, many=True).data
        return Response(data, 200)


class TaskViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = models.Task.objects.all()
    serializer_class = serializers.TaskSerializer

    @swagger_auto_schema(
        request_body=no_body,
        operation_summary='отметить задачу как выполненную',
        responses={200: serializers.CompletedTaskSerializer()},
    )
    @action(['POST'], True, 'complete', 'complete-task')
    def complete(self, request: Request, pk: int):
        completed, created = models.CompletedTask.objects.get_or_create(
            user_id=request.user.id,
            task_id=pk,
        )
        data = serializers.CompletedTaskSerializer(completed).data
        return Response(data, 201)

    @action(['GET'], True, 'completed', 'completed-tasks')
    def completed(self, request: Request, pk: int):
        completed = models.CompletedTask.objects.filter(task_id=pk)
        data = serializers.CompletedTaskSerializer(completed, many=True).data
        return Response(data, 200)
