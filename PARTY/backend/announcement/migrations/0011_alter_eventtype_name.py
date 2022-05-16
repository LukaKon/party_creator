# Generated by Django 4.0.3 on 2022-05-05 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('announcement', '0010_eventtype_remove_announcement_event_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventtype',
            name='name',
            field=models.CharField(choices=[('muzyka', 'music'), ('cattering', 'cattering'), ('fotograf', 'photograph'), ('lokal', 'local'), ('animator', 'animator')], max_length=30),
        ),
    ]
