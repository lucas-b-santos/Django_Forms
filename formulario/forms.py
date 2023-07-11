from django import forms
from .models import Dados
from django.forms.widgets import NumberInput
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import datetime
import re

MANTER_MASCARA = True

MIN_LENGTH_CAMPOS = {
    'rg': '12',
    'cpf_cnpj':'14', 
    'telefone':'15',
    'cep':'9'
}

def remove_char(string):
    removed_chars = '.-/()'
    s = string
    chars = '[%s]+' % re.escape(removed_chars)
    return re.sub(chars, '', s)

class formPrincipal(forms.ModelForm):
    # Construtor usado para alterar as classes HTML para os inputs do form gerado
    def __init__(self, *args, **kwargs):
        super(formPrincipal, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'form-control'}) #<- dicionario com cada atributo e seu respectivo valor desejado
            if field in MIN_LENGTH_CAMPOS:
                self.fields[field].widget.attrs.update({'minlength': MIN_LENGTH_CAMPOS[field]})


    class Meta:
        model = Dados
        fields = "__all__"
        widgets = {
            'data_nascimento':NumberInput(attrs={'type': 'date','max': datetime.date.today()}),#limita a data do input para o dia de hoje
            'data_inicial':NumberInput(attrs={'type': 'date','min': datetime.date.today()}),
            'data_final':NumberInput(attrs={'type': 'date','min': datetime.date.today()}),
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
        # if MANTER_MASCARA:
        #     if len(data) == 14 or len(data) == 18:
        #         return data
        #     else: 
        #         raise ValidationError(_("Favor digitar corretamente os dados!"))
        # else:
        #     if len(data) == 14 or len(data) == 18:
        #         return remove_char(data)
        #     else: 
        #         raise ValidationError(_("Favor digitar corretamente os dados!"))
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


  
        
        
       
