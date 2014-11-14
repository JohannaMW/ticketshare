from django.contrib.auth.forms import UserCreationForm
from django.forms import forms
from models import *

class UserForm(UserCreationForm):
    #email = forms.EmailField(required=True)
    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "password1", "password2")

    def clean_username(self):
        username = self.cleaned_data["username"]
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(
            self.error_messages['duplicate_username'],
            code='duplicate_username',
        )