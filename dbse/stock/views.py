from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from . import models

# Create your views here.

def allbooks(request):
    return JsonResponse({'result': 200, 'msg': json.loads(models.booksDetail())}, status=200)
