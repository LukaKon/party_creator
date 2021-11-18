# Generated by Django 3.2.9 on 2021-11-16 21:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0015_alter_newsletter_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='announcement',
            name='images',
        ),
        migrations.AddField(
            model_name='announcementimage',
            name='announcement',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='announcement.announcement', verbose_name='announcement_image'),
        ),
    ]
