# Generated by Django 4.0.3 on 2022-05-03 18:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0003_announcement_category_announcement_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='announcement',
            name='category',
        ),
        migrations.RemoveField(
            model_name='announcement',
            name='event',
        ),
        migrations.RemoveField(
            model_name='announcement',
            name='user',
        ),
    ]