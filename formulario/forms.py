from django import forms
from .models import Propriedade, Proprietario

class formProprietario(forms.ModelForm):
    class Meta:
        model = Proprietario
        fields = '__all__'

class formPropriedade(forms.ModelForm):
    class Meta:
        model = Propriedade
        fields = '__all__'
        exclude = ['proprietario']

