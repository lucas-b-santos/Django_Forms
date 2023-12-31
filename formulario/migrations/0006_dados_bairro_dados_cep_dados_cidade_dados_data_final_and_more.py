# Generated by Django 4.2.3 on 2023-07-09 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0005_remove_dados_cidade_remove_dados_estado'),
    ]

    operations = [
        migrations.AddField(
            model_name='dados',
            name='bairro',
            field=models.CharField(default=None, max_length=15),
        ),
        migrations.AddField(
            model_name='dados',
            name='cep',
            field=models.CharField(default=None, max_length=12),
        ),
        migrations.AddField(
            model_name='dados',
            name='cidade',
            field=models.CharField(default=None, max_length=12),
        ),
        migrations.AddField(
            model_name='dados',
            name='data_final',
            field=models.DateField(default=None),
        ),
        migrations.AddField(
            model_name='dados',
            name='data_inicial',
            field=models.DateField(default=None),
        ),
        migrations.AddField(
            model_name='dados',
            name='estado',
            field=models.CharField(default=None, max_length=12),
        ),
        migrations.AddField(
            model_name='dados',
            name='logradouro',
            field=models.CharField(default=None, max_length=15),
        ),
    ]
