# Generated by Django 3.2.9 on 2021-11-14 17:56

import account.utils.account
from django.db import migrations
import dynamic_filenames


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_auto_20211112_2050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=account.utils.account.stdimage_save_defaultimg(blank=True, default='default.jpg', null=True, upload_to=dynamic_filenames.FilePattern(filename_pattern='{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}')),
        ),
    ]
