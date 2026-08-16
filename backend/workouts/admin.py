from django.contrib import admin
from .models import WorkoutSession, Exercise


@admin.register(WorkoutSession)
class WorkoutSessionAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "date", "created_at")


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "session", "sets", "reps", "weight")
    search_fields = ("name",)