# Generated by Django 4.0.3 on 2022-05-12 20:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0002_user_uuid"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="uuid",
        ),
    ]
