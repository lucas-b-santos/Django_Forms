# Generated by Django 3.2.20 on 2023-07-05 22:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('formulario', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dados',
            name='criado_em',
        ),
        migrations.RemoveField(
            model_name='dados',
            name='intervalo',
        ),
        migrations.RemoveField(
            model_name='dados',
            name='modificado_em',
        ),
        migrations.RemoveField(
            model_name='dados',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='dados',
            name='url',
        ),
    ]