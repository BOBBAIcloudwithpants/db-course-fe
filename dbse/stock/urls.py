from django.urls import path

from . import views

urlpatterns = {
    path("", views.allbooks, name="books" ),
    path("return", views.returnBooks, name="returnBooks"),
    path("had", views.allHadBooks, name="allHadBooks"),
    path("buy", views.buyBooks, name="buyBooks"),
    path("sell", views.sellBooks, name="sellBooks"),
    path("insert", views.insertBook, name="insertBook"),
    path("year", views.getYearSale, name="yearSale"),
    path("day", views.getDaySale, name="daySale"),
    path("month", views.getMonthSale, name="monthSale"),
    path("total", views.getTotalSale, name="totalSale"),
    path('static', views.getTotalStatic, name="static"),
    path("totalall", views.getTotalSaleForAllBooks, name="totalAll")
}