# Generated by Django 4.0.3 on 2022-05-07 09:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('announcement', '0016_remove_announcement_event_type_announcement_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
