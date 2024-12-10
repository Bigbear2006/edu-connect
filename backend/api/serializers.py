from rest_framework.generics import get_object_or_404
from rest_framework.serializers import ModelSerializer

from api import models
from jwt_auth.serializers import UserSerializer


class CourseSerializer(ModelSerializer):
    class Meta:
        model = models.Course
        fields = '__all__'
        read_only_fields = ('created_by',)

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super(CourseSerializer, self).create(validated_data)


class TaskSerializer(ModelSerializer):
    class Meta:
        model = models.Task
        fields = '__all__'
        read_only_fields = ('created_by',)

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super(TaskSerializer, self).create(validated_data)


class CompletedTaskSerializer(ModelSerializer):
    class Meta:
        model = models.CompletedTask
        fields = '__all__'
        read_only_fields = ('user', 'task')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['task'] = get_object_or_404(
            models.Task,
            pk=self.context['task_id'],
        )
        validated_data.pop('is_right', None)
        return super(CompletedTaskSerializer, self).create(validated_data)


class ChangeRoleBidSerializer(ModelSerializer):
    class Meta:
        model = models.ChangeRoleBid
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super(ChangeRoleBidSerializer, self).create(validated_data)

    def to_representation(self, instance):
        data = super(ChangeRoleBidSerializer, self).to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data


class CompanySerializer(ModelSerializer):
    class Meta:
        model = models.Company
        fields = '__all__'


class JobSerializer(ModelSerializer):
    class Meta:
        model = models.Job
        fields = '__all__'


class JobApplicationSerializer(ModelSerializer):
    class Meta:
        model = models.JobApplication
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data.pop('accepted', None)

        try:
            return models.JobApplication.objects.get(
                user=validated_data['user'],
                job_id=validated_data['job'],
            )
        except models.JobApplication.DoesNotExist:
            return super(JobApplicationSerializer, self).create(validated_data)

    def to_representation(self, instance):
        data = super(JobApplicationSerializer, self).to_representation(
            instance,
        )

        if self.context.get('user_detail', False):
            data['user'] = UserSerializer(instance.user).data

        if self.context.get('job_detail', False):
            data['job'] = JobSerializer(instance.job).data
        return data
