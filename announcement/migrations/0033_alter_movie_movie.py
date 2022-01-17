# Generated by Django 3.2.9 on 2022-01-10 19:44

import dynamic_filenames
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("announcement", "0032_movie_movie"),
    ]

    operations = [
        migrations.AlterField(
            model_name="movie",
            name="movie",
            field=models.FileField(
                null=True,
                upload_to=dynamic_filenames.FilePattern(
                    filename_pattern="{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}"
                ),
                verbose_name="movies",
            ),
        ),
    ]