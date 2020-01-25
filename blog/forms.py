from django import forms

from .models import Post

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('location_name','Coordinates','Building_name','Floor_number','Map_Img')