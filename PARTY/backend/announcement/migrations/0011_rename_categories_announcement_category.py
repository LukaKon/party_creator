# Generated by Django 4.0.8 on 2022-10-10 19:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0010_remove_image_user_remove_movie_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='announcement',
            old_name='categories',
            new_name='category',
        ),
    ]
