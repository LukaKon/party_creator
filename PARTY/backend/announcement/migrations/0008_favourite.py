# Generated by Django 4.0.7 on 2022-10-18 16:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('announcement', '0007_remove_announcement_category_announcement_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favourite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('announcement', models.ManyToManyField(related_name='announcement_favourites', to='announcement.announcement')),
                ('user', models.ManyToManyField(related_name='user_favourites', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]