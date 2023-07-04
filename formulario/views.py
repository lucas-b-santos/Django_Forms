from django.shortcuts import render
from django.http import HttpResponse
from .forms import formPropriedade, formProprietario

# Create your views here.
def teste(request): 
    return HttpResponse('Aqui vai ter o formulario!!')