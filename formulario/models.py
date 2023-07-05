from django.db import models

# Create your models here.
class Dados(models.Model):
    nome = models.CharField(max_length=100, verbose_name="nome")
    data_nascimento = models.DateField()
    bigInt = models.BigIntegerField()
    decimal = models.DecimalField(decimal_places=2, max_digits=5)
    flutuante = models.FloatField()
    inteiro = models.IntegerField()
    email = models.EmailField()


    def __str__(self):
        return self.nome
    


