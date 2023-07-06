# Generated by Django 4.2.3 on 2023-07-06 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0002_auto_20230705_1903'),
    ]

    operations = [
        migrations.CreateModel(
            name='Proprietario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, verbose_name='nome')),
                ('rg', models.CharField(max_length=12)),
                ('cpf_cnpj', models.CharField(max_length=14)),
                ('telefone', models.CharField(max_length=15)),
                ('data_nascimento', models.DateField()),
                ('cidade', models.CharField(max_length=12)),
                ('estado', models.CharField(max_length=12)),
                ('pais', models.CharField(max_length=12)),
                ('criado_em', models.DateTimeField(auto_now_add=True)),
                ('modificado_em', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Dados',
        ),
    ]
