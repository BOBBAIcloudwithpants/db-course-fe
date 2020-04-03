from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from . import models


def hello(request):
    return JsonResponse({'result': 200, 'msg': '连接成功'})


def register(request):
    req = json.loads(request.body)

    user = models.User(0, req['username'], req['password'])
    if models.User.createUser(user):
        return JsonResponse({'result': 200, 'msg': '创建用户成功'}, status=200)
    else:
        return JsonResponse({'result': 500, 'msg': '创建用户失败, 该用户名已被注册'}, status=500)



