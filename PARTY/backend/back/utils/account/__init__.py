from django.db.models.fields.files import FileField
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
import stdimage
from account.tokens import token_manage

DOMAIN = "http://127.0.0.1:3000"


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


def activate_account_send_email(request, user, to_email):
    mail_subject = "Activate your user account"
    message = render_to_string("template_activate_account.html",
                               {"user": user.username,
                                "domain": DOMAIN,
                                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                                "token": token_manage.make_token(user),
                                "protocol": 'https' if request.is_secure() else 'http'
                                })
    email = EmailMessage(mail_subject, message, to=[to_email])

    if email.send():
        print('true')
        print(email.send())
    else:
        print('else')
        print(email.send())


def change_email_send_email(request, user, new_email):
    mail_subject = "Change your email"
    message = render_to_string("template_change_email.html",
                               {"user": user.username,
                                "domain": DOMAIN,
                                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                                "new_email": urlsafe_base64_encode(force_bytes(new_email)),
                                "token": token_manage.make_token(user),
                                "protocol": 'https' if request.is_secure() else 'http'
                                })
    email = EmailMessage(mail_subject, message, to=[new_email])

    if email.send():
        print('true')
        print(email.send())
    else:
        print('else')
        print(email.send())
