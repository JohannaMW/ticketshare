from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from rest_framework import generics
from api.serializers import UserSerializer


def home(request):
    return render(request, 'home.html', {'user': request.user})

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer