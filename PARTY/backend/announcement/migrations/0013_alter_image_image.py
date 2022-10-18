# Generated by Django 4.0.8 on 2022-10-12 19:58

from django.db import migrations
import dynamic_filenames
import stdimage.models


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0012_alter_image_announcement_alter_movie_announcement'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=stdimage.models.StdImageField(default='media/default.jpg', upload_to=dynamic_filenames.FilePattern(filename_pattern='{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}'), verbose_name='images'),
        ),
    ]
