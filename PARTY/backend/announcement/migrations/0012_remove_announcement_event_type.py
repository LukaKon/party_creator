# Generated by Django 4.0.3 on 2022-05-05 18:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0011_alter_eventtype_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='announcement',
            name='event_type',
        ),
    ]