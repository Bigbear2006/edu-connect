from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

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
        context['task_id'] = self.kwargs.get('pk', None)
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

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'is_right',
                openapi.IN_QUERY,
                type=openapi.TYPE_BOOLEAN,
            ),
        ],
    )
    @action(['GET'], True, 'completed', 'completed-tasks')
    def completed(self, request: Request, pk: int):
        completed = models.CompletedTask.objects.filter(
            task_id=pk,
        ).select_related('user')

        bool_vars = {'true': True, 'false': False}
        is_right = bool_vars.get(
            request.query_params.get('is_right', None),
            None,
        )
        completed = completed.filter(is_right=is_right)

        data = serializers.CompletedTaskSerializer(
            completed,
            context={'user_detail': True},
            many=True,
        ).data
        return Response(data, 200)

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'is_right': openapi.Schema(type=openapi.TYPE_BOOLEAN),
            },
        ),
        manual_parameters=[
            openapi.Parameter(
                'solution_id',
                openapi.IN_QUERY,
                required=True,
                type=openapi.TYPE_INTEGER,
            ),
        ],
    )
    @action(['POST'], True, 'evaluate', 'evaluate-task')
    def evaluate(self, request: Request, pk: int):
        solution_id = request.query_params.get('solution_id', None)
        obj = get_object_or_404(models.CompletedTask, pk=solution_id)
        obj.is_right = request.data.get('is_right', False)
        obj.save()
        data = serializers.CompletedTaskSerializer(obj).data
        return Response(data, 200)


class ChangeRoleBidViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = models.ChangeRoleBid.objects.all()
    serializer_class = serializers.ChangeRoleBidSerializer

    def get_queryset(self):
        return (
            super(ChangeRoleBidViewSet, self)
            .get_queryset()
            .select_related('user')
        )


class CompanyViewSet(ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer

    @swagger_auto_schema(responses={200: serializers.JobSerializer(many=True)})
    @action(['GET'], True, 'jobs', 'company-jobs')
    def jobs(self, request: Request, pk: int):
        jobs = self.get_object().jobs.all()
        data = serializers.JobSerializer(jobs, many=True).data
        return Response(data, 200)


class JobViewSet(ModelViewSet):
    queryset = models.Job.objects.all()
    serializer_class = serializers.JobSerializer

    @swagger_auto_schema(
        responses={200: serializers.JobApplicationSerializer(many=True)},
    )
    @action(['GET'], True, 'applications', 'job-applications')
    def applications(self, request: Request, pk: int):
        applications = self.get_object().applications.all()
        applications = applications.select_related('user')
        data = serializers.JobApplicationSerializer(
            applications,
            context=self.get_serializer_context(),
            many=True,
        ).data
        return Response(data, 200)

    def get_serializer_context(self):
        context = super(JobViewSet, self).get_serializer_context()
        context['user_detail'] = True
        return context


class JobApplicationViewSet(mixins.CreateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = models.JobApplication.objects.all()
    serializer_class = serializers.JobApplicationSerializer

    def get_queryset(self):
        return (
            super(JobApplicationViewSet, self)
            .get_queryset()
            .select_related('user')
        )

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'accepted': openapi.Schema(type=openapi.TYPE_BOOLEAN),
            },
        ),
    )
    @action(['POST'], True, 'accept', 'accept-application')
    def accept(self, request: Request, pk: int):
        obj = self.get_object()
        obj.accepted = request.data.get('accepted', False)
        obj.save()
        data = serializers.JobApplicationSerializer(obj).data
        return Response(data, 200)
