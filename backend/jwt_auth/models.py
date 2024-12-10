from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_STUDENT = 'Студент'
    ROLE_TEACHER = 'Учитель'
    ROLE_EMPLOYER = 'Работодатель'
    ROLE_ADMIN = 'Админ'

    ROLES = (
        (ROLE_STUDENT, ROLE_STUDENT),
        (ROLE_TEACHER, ROLE_TEACHER),
        (ROLE_EMPLOYER, ROLE_EMPLOYER),
        (ROLE_ADMIN, ROLE_ADMIN),
    )
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']

    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=ROLES, default=ROLE_STUDENT)
