# Generated by Django 3.2.9 on 2021-11-12 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_alter_user_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Firma',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='is_firma',
            field=models.BooleanField(default=False),
        ),
    ]