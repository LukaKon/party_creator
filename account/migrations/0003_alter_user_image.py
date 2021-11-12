from django.db import migrations
import dynamic_filenames
import stdimage.models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20211111_1432'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',

            field=stdimage.models.StdImageField(blank=True, default='default.jpg', null=True, upload_to=dynamic_filenames.FilePattern(filename_pattern='{app_label:.25}/{model_name:.30}/{uuid:base32}{ext}')),
        ),
    ]
