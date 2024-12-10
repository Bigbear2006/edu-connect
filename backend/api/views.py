from drf_yasg.utils import swagger_auto_schema
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

    def get_serializer_context(self):
        context = super(TaskViewSet, self).get_serializer_context()
        context['task_id'] = self.kwargs['pk']
        return context

    @swagger_auto_schema(
        request_body=serializers.CompletedTaskSerializer,
        operation_summary='прислать ответ на задачу',
        responses={200: serializers.CompletedTaskSerializer()},
    )
    @action(['POST'], True, 'complete', 'complete-task')
    def complete(self, request: Request, pk: int):
        serializer = serializers.CompletedTaskSerializer(
            data=request.data,
            context=self.get_serializer_context(),
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, 201)

    @action(['GET'], True, 'completed', 'completed-tasks')
    def completed(self, request: Request, pk: int):
        completed = models.CompletedTask.objects.filter(task_id=pk)
        data = serializers.CompletedTaskSerializer(completed, many=True).data
        return Response(data, 200)
