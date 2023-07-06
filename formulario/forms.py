from django import forms
from .models import Proprietario
from django.forms.widgets import NumberInput
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import datetime

class formProprietario(forms.ModelForm):
    # Esse construtor eu uso para passar atributos do HTML para os inputs do form gerado
    #O atributo type não dá pra alterar aqui, altero via widgets
    def __init__(self, *args, **kwargs):
        super(formProprietario, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'form-control'}) #<- dicionario com cada atributo e seu respectivo valor desejado

    class Meta:
        model = Proprietario
        fields = "__all__"
        widgets = {
            'data_nascimento':NumberInput(attrs={'type': 'date','max': datetime.date.today()}),
        }
    

    def clean(self):
        cleaned_data = super().clean()

    def clean_nome(self):
        data = self.cleaned_data['nome']
        return data

    def clean_rg(self):
        data = self.cleaned_data['rg']
        return data

    def clean_cpf_cnpj(self):
        data = self.cleaned_data['cpf_cnpj']
        return data

    def clean_telefone(self):
        data = self.cleaned_data['telefone']
        return data
    
    def clean_data_nascimento(self):
        data = self.cleaned_data['data_nascimento']
        return data
    
    def clean_cidade(self):
        data = self.cleaned_data['cidade']
        return data
    
    def clean_estado(self):
        data = self.cleaned_data['estado']
        return data
    
    def clean_pais(self):
        data = self.cleaned_data['pais']
        return data


  
        
        
       
