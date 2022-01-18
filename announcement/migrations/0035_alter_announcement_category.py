# Generated by Django 3.2.9 on 2022-01-18 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0034_merge_0031_announcement_city_0033_alter_movie_movie'),
    ]

    operations = [
        migrations.AlterField(
            model_name='announcement',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='announcement.servicecategory', verbose_name='announcement_categories'),
        ),
    ]
