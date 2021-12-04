from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("announcement", "0024_alter_announcement_slug"),
    ]

    operations = [
        migrations.AlterField(
            model_name="announcement",
            name="slug",
            field=models.SlugField(unique=True),
        ),
    ]
