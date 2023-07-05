from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import formPrincipal


# Create your views here.
def teste(request): 
    if request.method == 'GET':
        form = formPrincipal
        context = {"form": form}
        return render(request, 'form.html', context)
    else:
        form = formPrincipal(request.POST)
        if form.is_valid():
            form.save()
        redirect('/')