# Generated by Django 3.2.9 on 2021-12-29 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("party_wizard", "0004_auto_20211228_1925"),
    ]

    operations = [
        migrations.AddField(
            model_name="formmodel",
            name="form_party",
            field=models.JSONField(default=1),
            preserve_default=False,
        ),
    ]
