from django.urls import path

from . import views

urlpatterns = {
    path("", views.allbooks, name="books" ),
}