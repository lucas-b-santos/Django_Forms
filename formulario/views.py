from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import formPrincipal

ERROR_MSGS = {
    'nome':'Informe um nome válido!', 
    'logradouro':'Informe um logradouro válido!', 
    'bairro':'Informe um bairro válido!', 
    'cidade':'Informe uma cidade válida!', 
    'rg':"Informe um RG válido!",
    'cpf_cnpj':"Informe um CPF/CNPJ válido!",
    'telefone':"Informe um telefone válido!",
    'cep':"Informe um CEP válido!",
    'uf':"Informe um estado válido!",
    'data_nascimento':"Informe uma data de nascimento válida!",
    'data_inicial':"Informe uma data inicial válida!",
    'data_final':"Informe uma data final válida!",
}

def teste(request): 
    if request.method == 'GET':
        form = formPrincipal
        context = {"form": form, "mensagens_JS":ERROR_MSGS}
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
        context = {"form": form, "mensagens_JS":ERROR_MSGS}
        return render(request, 'form.html', context) 
        

 

   
        