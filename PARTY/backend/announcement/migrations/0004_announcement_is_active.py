# Generated by Django 4.0.4 on 2022-05-23 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0003_alter_category_options_alter_image_announcement'),
    ]

    operations = [
        migrations.AddField(
            model_name='announcement',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
