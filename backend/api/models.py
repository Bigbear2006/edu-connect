from django.db import models

from jwt_auth.models import User


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(
        User,
        models.SET_NULL,
        'created_courses',
        null=True,
    )
    objects: models.Manager

    def __str__(self):
        return self.title


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    course = models.ForeignKey(Course, models.CASCADE, 'tasks')
    created_by = models.ForeignKey(
        User,
        models.SET_NULL,
        'created_tasks',
        null=True,
    )
    objects: models.Manager

    def __str__(self):
        return self.title


class CompletedTask(models.Model):
    solution = models.TextField()
    user = models.ForeignKey(User, models.CASCADE, 'completed_tasks')
    task = models.ForeignKey(Task, models.CASCADE, 'completed_by_users')
    completed_at = models.DateTimeField(auto_now_add=True)
    objects: models.Manager
