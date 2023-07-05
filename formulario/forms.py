from django import forms
from .models import Dados
from django.forms.widgets import NumberInput

placeholders = ['nome',  'email']

class formPrincipal(forms.ModelForm):


    # Esse construtor eu uso para passar atributos do HTML para os inputs do form gerado
    #O atributo type não dá pra alterar aqui, altero via widgets
    def __init__(self, *args, **kwargs):
        super(formPrincipal, self).__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'form-control'}) #<- dicionario com cada atributo e seu respectivo valor desejado
            if field in placeholders:
                self.fields[field].widget.attrs.update({'placeholder': field.capitalize()})


    class Meta:
        model = Dados
        fields = "__all__"
        widgets = {
            'data_nascimento':NumberInput(attrs={'type': 'date'}),
        }
        
        
       
