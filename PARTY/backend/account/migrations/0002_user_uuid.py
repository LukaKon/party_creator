# Generated by Django 4.0.3 on 2022-05-12 18:15

import uuid

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("account", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="uuid",
            field=models.UUIDField(db_index=True, default=uuid.uuid4, editable=False),
        ),
    ]
