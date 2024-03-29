# Generated by Django 4.0.10 on 2023-07-22 19:42

from django.db import migrations
import dynamic_filenames
import stdimage.models


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0025_alter_category_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=stdimage.models.StdImageField(default='announcement/defaultAnnouncement.jpg', force_min_size=False, upload_to=dynamic_filenames.FilePattern(filename_pattern='{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}'), variations={}, verbose_name='images'),
        ),
    ]
