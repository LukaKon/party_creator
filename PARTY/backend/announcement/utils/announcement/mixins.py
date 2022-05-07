from django.contrib.auth.mixins import UserPassesTestMixin
from django.http import HttpResponse


class UserAccessMixin(UserPassesTestMixin):
    def test_func(self):
        return self.get_object().user == self.request.user

    def dispatch(self, request, *args, **kwargs):
        if not self.get_test_func()():
            return HttpResponse("CZEGO TU SZUKASZ XDD")
        return super().dispatch(request, *args, **kwargs)
