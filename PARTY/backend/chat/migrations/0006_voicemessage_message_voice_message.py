# Generated by Django 4.0.8 on 2022-12-23 14:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_alter_message_uuid'),
    ]

    operations = [
        migrations.CreateModel(
            name='VoiceMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('voice_message', models.FileField(upload_to='')),
            ],
        ),
        migrations.AddField(
            model_name='message',
            name='voice_message',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='message', to='chat.voicemessage'),
        ),
    ]
