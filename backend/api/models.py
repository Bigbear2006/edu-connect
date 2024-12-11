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
    is_right = models.BooleanField(null=True)
    objects: models.Manager


class ChangeRoleBid(models.Model):
    role = models.CharField(max_length=50, choices=User.ROLES)
    user = models.ForeignKey(User, models.CASCADE, 'bids')
    created_at = models.DateTimeField(auto_now_add=True)
    objects: models.Manager


class Company(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    address = models.TextField()
    objects: models.Manager

    def __str__(self):
        return self.title


class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    company = models.ForeignKey(Company, models.CASCADE, 'jobs')
    created_at = models.DateTimeField(auto_now_add=True)
    objects: models.Manager

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    job = models.ForeignKey(Job, models.CASCADE, 'applications')
    user = models.ForeignKey(User, models.CASCADE, 'applications')
    created_at = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(null=True)
    objects: models.Manager


# class Project(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     company = models.ForeignKey(Company, models.CASCADE, 'projects')
#     created_at = models.DateTimeField(auto_now_add=True)
#     is_active = models.BooleanField(default=True)
#     objects: models.Manager
#
#     def __str__(self):
#         return self.title
#
#
# class Team(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     users = models.ManyToManyField(User, 'teams', through='TeamUser')
#     objects: models.Manager
#
#
# class TeamUser(models.Model):
#     team = models.ForeignKey(Team, models.CASCADE)
#     user = models.ForeignKey(User, models.CASCADE)
#     objects: models.Manager
#
#
# class ProjectSolution(models.Model):
#     project = models.ForeignKey(Project, models.CASCADE, 'solutions')
#     team = models.ForeignKey(Team, models.CASCADE, 'solutions')
#     solution = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     objects: models.Manager


class Forum(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(
        User,
        models.SET_NULL,
        'forums',
        null=True,
    )
    objects: models.Manager

    def __str__(self):
        return self.title


class Comment(models.Model):
    forum = models.ForeignKey(Forum, models.CASCADE, 'comments')
    text = models.TextField()
    user = models.ForeignKey(
        User,
        models.CASCADE,
        'comments',
    )
    objects: models.Manager

    def __str__(self):
        return self.text
