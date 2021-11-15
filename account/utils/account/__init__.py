import stdimage
from django.db.models.fields.files import FileField

class stdimage_save_defaultimg(stdimage.StdImageField):
    def save_form_data(self, instance, data):
        if self.delete_orphans and (data is False or data is not None) \
                and instance.image != 'default.jpg':
            file = getattr(instance, self.name)
            if file and file._committed and file != data:
                file.delete(save=False)
        FileField.save_form_data(self, instance, data)
