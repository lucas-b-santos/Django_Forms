from django.db import models

# Create your models here.
class Dados(models.Model):
    nome = models.CharField(max_length=100, verbose_name="nome")
    rg = models.CharField(max_length=12)
    cpf_cnpj = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=15)
    data_nascimento = models.DateField()
    cidade = models.CharField(max_length=12)
    estado = models.CharField(max_length=12)


    #registros especiais e automaticos
    criado_em = models.DateTimeField(auto_now_add=True)
    modificado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome
    



