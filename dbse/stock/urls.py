from django.urls import path

from . import views

urlpatterns = {
    path("", views.allbooks, name="books" ),
    path("buy", views.buyBooks, name="buyBooks"),
    path("sell", views.sellBooks, name="sellBooks")
}