from django.db import models

class Dados(models.Model):
    nome = models.CharField(max_length=100)
    rg = models.CharField(max_length=12, verbose_name='RG')
    cpf_cnpj = models.CharField(max_length=18, unique=True, verbose_name='CPF/CNPJ')
    telefone = models.CharField(max_length=15)
    data_nascimento = models.DateField(verbose_name='Data de nascimento')
    cep = models.CharField(max_length=9, default=None, verbose_name='CEP')
    logradouro = models.CharField(max_length=15, default=None)
    bairro = models.CharField(max_length=15, default=None)
    cidade = models.CharField(max_length=12, default=None )
    uf = models.CharField(max_length=2, default=None, verbose_name='UF')
    data_inicial = models.DateField(default=None)
    data_final = models.DateField(default=None)

    #registros especiais e automaticos
    criado_em = models.DateTimeField(auto_now_add=True)
    modificado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nome