from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    WorkoutSessionViewSet,
    ExerciseViewSet,
)

router = DefaultRouter()
router.register(
    "sessions",
    WorkoutSessionViewSet,
    basename="session"
)

urlpatterns = router.urls + [

    path(
        "sessions/<int:session_id>/exercises/",
        ExerciseViewSet.as_view({
            "get": "list",
            "post": "create",
        }),
        name="session-exercises",
    ),

    path(
        "exercises/<int:pk>/",
        ExerciseViewSet.as_view({
            "patch": "partial_update",
            "delete": "destroy",
        }),
        name="exercise-detail",
    ),
]