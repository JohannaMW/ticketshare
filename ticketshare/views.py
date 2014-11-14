from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from ticketshare.forms import UserForm

def home(request):
    return render(request, 'home.html')

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
                    return redirect("data")
    else:
        form = UserForm()

    return render(request, "registration/register.html", {
        'form': form,
    })