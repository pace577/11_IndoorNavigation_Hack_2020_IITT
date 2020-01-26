from django.contrib.gis.geos import Point
from pages.models import IndoorObject


lng = 79.41
lat = 13.63
indid = 1
name = "Indoor_testobject_1"

IndoorObject(indid=indid, name=name, geom=Point(lng, lat)).save()
