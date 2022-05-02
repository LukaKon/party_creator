# Generated by Django 4.0.3 on 2022-05-02 18:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('announcement', '0003_delete_movie'),
    ]

    operations = [
        migrations.AddField(
            model_name='announcement',
            name='category',
            field=models.ForeignKey(default=django.utils.timezone.now, on_delete=django.db.models.deletion.PROTECT, to='announcement.servicecategory', verbose_name='announcement_categories'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='announcement',
            name='user',
            field=models.ForeignKey(default=django.utils.timezone.now, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
