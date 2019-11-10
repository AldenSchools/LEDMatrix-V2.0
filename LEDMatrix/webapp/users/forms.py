from django import forms

class UserLoginForm(forms.Form):
    username = forms.CharField(strip=True, help_text='A valid email address, please.', label="Username:", max_length=120)

class UserRegisterForm(forms.Form):
    first_name = forms.CharField(label="First Name:", max_length=120,strip=True)
    last_name = forms.CharField(label="Last Name:", max_length=120,strip=True)
    username = forms.CharField(label="Username:", max_length=120, strip=True)


class AdminLoginForm():
    acct_name = forms.CharField(label="Account Name:", max_length=120,strip=True)
    password = forms.CharField(label="Password:", max_length=120, strip=True) 
    