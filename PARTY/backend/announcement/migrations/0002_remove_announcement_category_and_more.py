# Generated by Django 4.0.3 on 2022-05-03 17:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='announcement',
            name='category',
        ),
        migrations.RemoveField(
            model_name='announcement',
            name='user',
        ),
    ]