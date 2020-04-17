from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from . import models

# Create your views here.

def allbooks(request):
    return JsonResponse({'result': 200, 'msg': json.loads(models.booksDetail())}, status=200)

def allHadBooks(request):
    return JsonResponse({'result': 200, 'msg': json.loads(models.hadBookDetail())}, status=200)

def insertBook(request):
    req = json.loads(request.body)
    models.insertBook(req)
    return JsonResponse({'result': 200, 'msg': '插入成功'}, status=200)
def buyBooks(request):
    req = json.loads(request.body)
    models.buyBooks(req)
    return JsonResponse({'result': 200, 'msg': '购买成功'}, status=200)

def sellBooks(request):
    req = json.loads(request.body)
    models.sellBooks(req)
    return JsonResponse({'result': 200, 'msg': '卖出成功'}, status=200)

def getYearSale(request):
    req = json.loads((request.body))
    return JsonResponse({'result': 200, 'msg': json.loads(models.saleYearNumber(req))}, status=200)
def getMonthSale(request):
    req = json.loads((request.body))
    return JsonResponse({'result': 200, 'msg': json.loads(models.saleMonthNumber(req))}, status=200)

def getDaySale(request):
    req = json.loads((request.body))
    return JsonResponse({'result': 200, 'msg': json.loads(models.saleDayNumber(req))}, status=200)

def getTotalSale(request):
    req = json.loads((request.body))
    return JsonResponse({'result': 200, 'msg': json.loads(models.saleTotalNumber(req))}, status=200)

def getTotalStatic(request):
    req = json.loads(request.body)
    return JsonResponse({'result': 200, 'msg': json.loads(models.intervalSaleNumber(req))}, status=200)

def getTotalSaleForAllBooks(request):
    req = json.loads(request.body)
    return JsonResponse({'result': 200, 'msg': json.loads(models.saleTotalNumberOfAllBooks(req))}, status=200)




