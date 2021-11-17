# Generated by Django 3.2.9 on 2021-11-15 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0005_auto_20211115_0911'),
    ]

    operations = [
        migrations.AddField(
            model_name='announcement',
            name='type',
            field=models.CharField(choices=[('lokal', 'lokal'), ('kapela', 'kapela'), ('gastronomia', 'gastronomia')], default='lokal', max_length=100),
        ),
    ]