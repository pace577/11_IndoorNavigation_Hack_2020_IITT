from django.db import models
from django.contrib.gis.db import models as gismodels
from django.db.models import Manager as GeoManager
from django.contrib.gis.geos import Point

# Create your models here.
class IndoorObject(gismodels.Model):

    indid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=256)

    geom = gismodels.PointField()

    objects = GeoManager()

    def __unicode__(self):
        return self.name



