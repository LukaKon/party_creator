# Generated by Django 3.2.9 on 2021-11-16 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0014_auto_20211116_0831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newsletter',
            name='email',
            field=models.EmailField(max_length=250, unique=True),
        ),
    ]