from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import formPrincipal

validacaoJS = {
    'rg':"Favor informar um RG válido!",
    'cpf_cnpj':"Favor informar um CPF/CNPJ válido!",
    'telefone':"Favor informar um telefone válido!",
    'cep':"Favor informar um CEP válido!",
    'estado':"Favor informar um estado válido!",
}

def teste(request): 
    if request.method == 'GET':
        form = formPrincipal
        for field in form.base_fields:
            if field not in validacaoJS:
                validacaoJS[field] = "Preencha este campo."

        context = {"form": form, "mensagens_JS":validacaoJS}
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
        

 

   
        