from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request

from jwt_auth.models import User


class IsStudent(IsAuthenticated):
    message = 'user is not student'

    def has_permission(self, request: Request, view):
        return (
            super(IsStudent, self).has_permission(request, view)
            and request.user.role == User.ROLE_STUDENT
        )


class IsTeacher(IsAuthenticated):
    message = 'user is not teacher'

    def has_permission(self, request: Request, view):
        return (
            super(IsTeacher, self).has_permission(request, view)
            and request.user
            and request.user.role == User.ROLE_TEACHER
        )


class IsEmployer(IsAuthenticated):
    message = 'user is not employer'

    def has_permission(self, request: Request, view):
        return (
            super(IsEmployer, self).has_permission(request, view)
            and request.user
            and request.user.role == User.ROLE_EMPLOYER
        )


class IsAdmin(IsAuthenticated):
    message = 'user is not admin'

    def has_permission(self, request: Request, view):
        return (
            super(IsAdmin, self).has_permission(request, view)
            and request.user
            and request.user.role == User.ROLE_ADMIN
        )
