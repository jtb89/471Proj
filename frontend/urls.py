from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('<path:path>', index),  # This catches all routes for React Router
]