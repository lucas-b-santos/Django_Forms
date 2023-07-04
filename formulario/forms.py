from django.forms import ModelForm
from .models import Dados

class formPrincipal(ModelForm):
    class Meta:
        model = Dados
        fields = "__all__"

