# Generated by Django 3.2.20 on 2023-07-14 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0006_dados_bairro_dados_cep_dados_cidade_dados_data_final_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dados',
            name='estado',
        ),
        migrations.AddField(
            model_name='dados',
            name='uf',
            field=models.CharField(default=None, max_length=2, verbose_name='UF'),
        ),
        migrations.AlterField(
            model_name='dados',
            name='cep',
            field=models.CharField(default=None, max_length=9, verbose_name='CEP'),
        ),
        migrations.AlterField(
            model_name='dados',
            name='cpf_cnpj',
            field=models.CharField(max_length=18, unique=True, verbose_name='CPF/CNPJ'),
        ),
        migrations.AlterField(
            model_name='dados',
            name='data_nascimento',
            field=models.DateField(verbose_name='Data de nascimento'),
        ),
        migrations.AlterField(
            model_name='dados',
            name='nome',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='dados',
            name='rg',
            field=models.CharField(max_length=12, verbose_name='RG'),
        ),
    ]
