# Generated by Django 4.0.3 on 2022-05-07 18:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0019_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='announcement',
            name='user',
        ),
    ]