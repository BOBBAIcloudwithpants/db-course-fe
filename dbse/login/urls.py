from django.urls import path

from . import views

urlpatterns = {
    path("healthz", views.hello, name='hello'),
    path("register", views.register, name="register"),
    path("", views.login, name="login")
}