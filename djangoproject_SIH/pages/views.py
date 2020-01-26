from django.shortcuts import render
from django.contrib.gis.geos import Point

from pages.models import IndoorObject

def home(request): 
	return render(request,"home.html",{}) 
def about(request): 
	from pages.namer import bob
	return render(request,"about.html", {"my_stuff": bob}) 
def contacts(request): 
	return render(request,"contacts.html",{})  
def testimonials(request):   
	from pages.namer import bob
	return render(request,"testimonials.html",{"my_stuff": bob()})    
def contact(request):  
	from pages.namer import bob
	return render(request,"contact.html",{"my_stuff": bob()}) 
def result1(request): 
	return render(request,"result1.html",{})  
def result2(request): 
	return render(request,"result2.html",{})   
def result3(request): 
	return render(request,"result3.html",{})  
def result4(request): 
	return render(request,"result4.html",{})  
def gallery(request): 
	return render(request,"gallery.html",{})  
def admission(request): 
	return render(request,"admission.html",{})  
def form(request): 
	return render(request,"form.html",{}) 
def maps(request): 
	return render(request,"maps.html",{}) 

def viewmap(request,lat,lng): 
	return render(request,"result1.html",{}) 

def image_conversion2(request):

        import cv2

        img = cv2.imread('static/images/resized_floor1.png',2)
        ret, img = cv2.threshold(img,240,255,cv2.THRESH_BINARY)

        width = 100
        height = 100

        dimension = (width,height)
        img = cv2.resize(img,dimension,interpolation=cv2.INTER_AREA)
        
        #print(img.shape)

        cv2.imwrite("static/images/converted_resized_floor1.png",img)

        cv2.waitKey(0)
        cv2.destroyAllWindows()
        return render(request,"path_finder.html",{})

def image_conversion(request):

        return render(request,"path_finder.html",{})
