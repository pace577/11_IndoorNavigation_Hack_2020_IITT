from django.urls import path
from . import views 
from django.conf.urls import url

from djgeojson.views import GeoJSONLayerView

from pages.models import IndoorObject

urlpatterns = [  
	path('',views.home,name='home'), 
	path('about/',views.about,name='about'), 
	path('contacts/',views.contacts,name='contacts'),
    path('testimonials/',views.testimonials ,name='testimonials'),
    path('contact/',views.contact,name='contact'),  
    path('result1/',views.result1,name='result1'), 
    path('result2/',views.result2,name='result2'), 
    path('result3/',views.result3,name='result3'), 
    path('result4/',views.result4,name='result4'),
    path('gallery/',views.gallery,name='gallery'),
    path('admission/',views.admission,name='admission'), 
    path('form/',views.form,name='form'),
    path('maps/',views.maps,name='maps'),
    #path(r'^data.geojson$', GeoJSONLayerView.as_view(model=IndoorObject), name='data'), #FIND OUT WHAT THIS IS DOING!
    url(r'^.sqlite3$', GeoJSONLayerView.as_view(model=IndoorObject), name='data'),
    path('indoormap/<str:lat>/<str:lng>/',views.viewmap,name='lat-lng'),  
    path('image_conversion/',views.image_conversion2,name='image_conversion'),
    path('path_finder/',views.path_finder,name='path_finder'),
 ] 


