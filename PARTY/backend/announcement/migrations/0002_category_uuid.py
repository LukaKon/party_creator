# Generated by Django 4.0.3 on 2022-05-18 07:29

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='uuid',
            field=models.UUIDField(db_index=True, default=uuid.uuid4, editable=False),
        ),
    ]
