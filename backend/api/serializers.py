from rest_framework.serializers import ModelSerializer

from api import models


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
        validated_data['task'] = models.Task.objects.get(
            pk=self.context['task_id'],
        )
        return super(CompletedTaskSerializer, self).create(validated_data)
