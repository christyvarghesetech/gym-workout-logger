from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import api_status

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/status/", api_status),

    path("api/accounts/", include("accounts.urls")),

    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    


    path("admin/", admin.site.urls),

    path("api/status/", api_status),

    path("api/accounts/", include("accounts.urls")),

    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),

    path("api/", include("workouts.urls")),
]
