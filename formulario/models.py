from django.db import models

# Create your models here.
class Proprietario(models.Model):
    nome = models.CharField(max_length=100, verbose_name="nome")
    rg = models.CharField(max_length=12)
    cpf_cnpj = models.CharField(max_length=14)
    telefone = models.CharField(max_length=15)
    data_nascimento = models.DateField()
    cidade = models.CharField(max_length=12)
    estado = models.CharField(max_length=12)
    pais = models.CharField(max_length=12)

    #registros especiais e automaticos
    criado_em = models.DateTimeField(auto_now_add=True)
    modificado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome
    

class Propriedade(models.Model):
    proprietario = models.ForeignKey(Proprietario, on_delete=models.PROTECT)
    matricula = models.CharField(max_length=25)
    area_total = models.CharField(max_length=100)
    area_reserva_legal = models.CharField(max_length=100)
    area_preservacao = models.CharField(max_length=100)
    latitude = models.CharField(max_length=14)
    longitude = models.CharField(max_length=14)
    tipo_exploracao = models.CharField(max_length=100)
    cidade = models.CharField(max_length=12)
    estado = models.CharField(max_length=12)
    pais = models.CharField(max_length=12)

    criado_em = models.DateTimeField(auto_now_add=True)
    modificado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.matricula
    


