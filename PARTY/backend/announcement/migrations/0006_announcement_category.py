# Generated by Django 4.0.3 on 2022-05-03 19:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0005_alter_announcement_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='announcement',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='announcement.servicecategory', verbose_name='announcement_categories'),
        ),
    ]
