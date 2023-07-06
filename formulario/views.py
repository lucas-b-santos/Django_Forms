from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import formProprietario


# Create your views here.
def teste(request): 
    if request.method == 'GET':
        form = formProprietario
        context = {"form": form}
        return render(request, 'form.html', context)
    else:
        form = formProprietario(request.POST)
        if form.is_valid():
            form.save()
            form = formProprietario
        context = {"form": form}
        return render(request, 'form.html', context) 
        

 

   
        