from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import formPrincipal

def teste(request): 
    if request.method == 'GET':
        form = formPrincipal
        context = {"form": form}
        return render(request, 'form.html', context)
    else:
        form = formPrincipal(request.POST)
        if form.is_valid():
            print('FORM VÁLIDO!!!')

        data = {}

        for field in form.fields:
            if form.has_error(field):
                data[field] = None
            else:
                data[field] = form.cleaned_data[field]            

        form.data = data
        context = {"form": form}
        return render(request, 'form.html', context) 
        

 

   
        