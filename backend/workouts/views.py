from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied

from .models import WorkoutSession, Exercise
from .serializers import (
    WorkoutSessionSerializer,
    ExerciseSerializer
)


class WorkoutSessionViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSessionSerializer

    def get_queryset(self):
        return WorkoutSession.objects.filter(
            owner=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ExerciseViewSet(viewsets.ModelViewSet):
    serializer_class = ExerciseSerializer

    def get_queryset(self):
        return Exercise.objects.filter(
            session__owner=self.request.user
        )

    def perform_create(self, serializer):
        session_id = self.kwargs["session_id"]

        try:
            session = WorkoutSession.objects.get(
                id=session_id,
                owner=self.request.user
            )

        except WorkoutSession.DoesNotExist:
            raise PermissionDenied(
                "Workout session not found."
            )

        serializer.save(session=session)