from django.contrib.auth import authenticate, login
from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from ticketshare.forms import UserForm
import json
from ticketshare.models import UserProfile

@csrf_exempt
def set_position(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print data
        user = UserProfile.objects.get(username=request.user)
        print user
        user.long= data['long']
        user.lat = data['lat']
        user.ticket = True
        user.save()
        return HttpResponse(status=200)

@csrf_exempt
def set_ticket_status(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = UserProfile.objects.get(username=request.user)
        user.ticket = True
        user.save()
        return HttpResponse(status=200)

@csrf_exempt
def home(request):
    return render(request, 'home.html')

@csrf_exempt
def register(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            username = request.POST["username"]
            password = request.POST["password1"]
            form.save()
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect("home")
    else:
        form = UserForm()

    return render(request, "registration/register.html", {
        'form': form,
    })

def get_user(request):
    user = UserProfile.objects.get(username=request.user)
    data = serializers.serialize('json', [user])
    return HttpResponse(data, content_type='application/json')
