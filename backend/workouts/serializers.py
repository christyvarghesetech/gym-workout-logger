from rest_framework import serializers
from .models import WorkoutSession, Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = [
            "id",
            "session",
            "name",
            "sets",
            "reps",
            "weight",
        ]
        read_only_fields = ["id", "session"]


class WorkoutSessionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    exercises = ExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = WorkoutSession
        fields = [
            "id",
            "owner",
            "date",
            "created_at",
            "exercises",
        ]
        read_only_fields = [
            "id",
            "owner",
            "created_at",
        ]