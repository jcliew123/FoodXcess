from django.urls import path
from .views import SignUpView, LogInView, LogOutView

urlpatterns = [
    path('sign-up/', SignUpView.as_view()),
    path('sign-in/', LogInView.as_view()),
    path('sign-out/', LogOutView.as_view()),
]