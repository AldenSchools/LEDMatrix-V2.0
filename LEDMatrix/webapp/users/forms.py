from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import *



class UserLoginForm(forms.Form):
    widget = forms.TextInput(attrs={'class':'form-control','id':'' , "autocomplete":"off"})
    username = forms.CharField(help_text='A valid email address, please.', label="Username:", max_length=120,strip=True, widget=widget)

class UserRegisterForm(UserCreationForm):

    widget = forms.TextInput(attrs={'class':'form-control','id':'', "autocomplete":"off"})
    first_name = forms.CharField(label="First Name:", max_length=120,strip=True, widget=widget)
    last_name = forms.CharField(label="Last Name:", max_length=120,strip=True, widget=widget)
    username = forms.CharField(label="Username:", max_length=120, strip=True , widget=widget)

    #first_name.widget.attrs.update({'class': 'form-control'})

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
        user.admin_dash = False

        if(commit):
            user.save()
            UserProfile.objects.create(user=user, number_submissions=0, number_accepted_submissions=0)
        return user


class AdminLoginForm(forms.Form):
    widget = forms.TextInput(attrs={'class':'form-control','id':'' , "autocomplete":"off"})
    widget2 = forms.TextInput(attrs={'class':'form-control','type':'password', "autocomplete":"off"})
    acct_name = forms.CharField(label="Account Name:", max_length=120,strip=True, widget=widget)
    password = forms.CharField(label="Password:", max_length=120 , widget=widget2) 

class AdminRegisterForm(UserCreationForm):
    widget = forms.TextInput(attrs={'class':'form-control','id':'', "autocomplete":"off"})
    pass
    

class SubmitDrawingForm(forms.Form):
    widget = forms.TextInput(attrs={'id':'submit-drawing-id-input' , "autocomplete":"off", 'type':'hidden'})
    drawing_id= forms.IntegerField(initial=-1, widget=widget)

class DeleteDrawingForm(forms.Form):
    widget = forms.TextInput(attrs={'id':'delete-drawing-id-input' , "autocomplete":"off", 'type':'hidden'})
    drawing_id = forms.IntegerField(initial=-1, widget=widget)

class SaveDrawingForm(forms.Form):
    widget = forms.TextInput(attrs={'id':'save-drawing-id-input' , "autocomplete":"off", 'type':'hidden'})
    drawing_id = forms.IntegerField(initial=-1, widget=widget)
    new_drawing_data = forms.CharField(max_length=1792,strip=True,widget=forms.HiddenInput())

class CreateDrawingForm(forms.Form):
    widget = forms.TextInput(attrs={"class":"form-control", 'id':'new-drawing-name-input' , "autocomplete":"off","placeholder":"Enter new drawing name here" })
    drawing_name = forms.CharField( max_length=120,strip=True, widget=widget)

