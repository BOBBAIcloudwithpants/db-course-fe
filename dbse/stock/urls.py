from django.urls import path

from . import views

urlpatterns = {
    path("", views.allbooks, name="books" ),
    path("had", views.allHadBooks, name="allHadBooks"),
    path("buy", views.buyBooks, name="buyBooks"),
    path("sell", views.sellBooks, name="sellBooks"),
    path("insert", views.insertBook, name="insertBook")
}