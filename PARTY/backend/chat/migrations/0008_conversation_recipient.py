# Generated by Django 4.0.9 on 2023-02-03 18:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0007_alter_voicemessage_voice_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='conversation',
            name='recipient',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='recipient', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
