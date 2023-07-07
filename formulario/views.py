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
        form = formPrincipal(request.POST or None)
        if form.is_valid():
            print("FORM VALIDO!!")

        
        initial = {}

        for field in form.fields:
            if form.has_error(field):
                initial[field] = None
            else:
                initial[field] = form.cleaned_data[field]

        initial['data_nascimento'] = None
        print(initial)
        formLimpo = formPrincipal(initial=initial)

        context = {"form": formLimpo}
        return render(request, 'form.html', context) 
        

 

   
        