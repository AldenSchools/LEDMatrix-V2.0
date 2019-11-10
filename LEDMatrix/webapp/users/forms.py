from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class UserLoginForm(forms.Form):
    username = forms.CharField(strip=True, help_text='A valid email address, please.', label="Username:", max_length=120)

class UserRegisterForm(UserCreationForm):
    first_name = forms.CharField(label="First Name:", max_length=120,strip=True)
    last_name = forms.CharField(label="Last Name:", max_length=120,strip=True)
    username = forms.CharField(label="Username:", max_length=120, strip=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name','username']
        exclude = ['password1', 'password2']
        
        
    
    def __init__(self,*args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].required = False
        self.fields['password2'].required = False
        

    def save(self, commit=True):
        user = super().save(commit=False)
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.username = self.cleaned_data.get('username')
        user.set_unusable_password()
        if(commit):
            user.save()
        return user


class AdminLoginForm():
    acct_name = forms.CharField(label="Account Name:", max_length=120,strip=True)
    password = forms.CharField(label="Password:", max_length=120, strip=True) 

class AdminRegisterForm(UserCreationForm):
    pass
    