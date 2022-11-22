from django.db.models.fields.files import FileField
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
import stdimage
from account.tokens import account_activation_token


class stdimage_save_defaultimg(stdimage.StdImageField):
    def save_form_data(self, instance, data):
        if (
            self.delete_orphans
            and (data is False or data is not None)
            and instance.image != "default.jpg"
        ):
            file = getattr(instance, self.name)
            if file and file._committed and file != data:
                file.delete(save=False)
        FileField.save_form_data(self, instance, data)


def activate_email(request, user, to_email):
    mail_subject = "Activate your user account"
    message = render_to_string("template_activate_account.html",
                               {"user": user.username,
                                "domain": get_current_site(request),
                                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                                "token": account_activation_token.make_token(user),
                                "protocol": 'https' if request.is_secure() else 'http'
                                })
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        print('true')
        print(email.send())
    else:
        print('else')
        print(email.send())

