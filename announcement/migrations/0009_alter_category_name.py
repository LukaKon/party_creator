# Generated by Django 3.2.9 on 2021-11-15 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0008_alter_category_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(choices=[('rodzinne', 'rodzinne'), ('party', 'party')], default='rodzinne', max_length=100),
        ),
    ]