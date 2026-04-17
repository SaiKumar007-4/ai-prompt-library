from turtle import title

import redis
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Prompt

r = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)
# Create your views here.
@csrf_exempt
def prompt_list(request):
    if request.method == 'GET':
        prompts = Prompt.objects.all().values()
        return JsonResponse(list(prompts), safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
       
        title = data.get("title")
        content = data.get("content")
        complexity = data.get("complexity")
        if len(title) < 3:
            return JsonResponse({'error': 'Title must be at least 3 characters long.'}, status=400)
        if len(content) < 20:
            return JsonResponse({'error': 'Content must be at least 20 characters long.'}, status=400)
        if complexity < 1 or complexity > 10:
            return JsonResponse({'error': 'Complexity must be between 1 and 10.'}, status=400)
        prompt = Prompt.objects.create(
            title=title,
            content=content,
            complexity=complexity
        )
        return JsonResponse({'id': str(prompt.id)}, status=201)
    
def prompt_detail(request, id):
    try:
        prompt = Prompt.objects.get(id=id)
        key = f"prompt:{id}:views"
        view_count = r.incr(key)
        data = {
            'id': str(prompt.id),
            'title': prompt.title,
            'content': prompt.content,
            'complexity': prompt.complexity,
            'created_at': prompt.created_at.isoformat(),
            'view_count': view_count
        }
        return JsonResponse(data)
    except Prompt.DoesNotExist:
        return JsonResponse({'error': 'Prompt not found'}, status=404)