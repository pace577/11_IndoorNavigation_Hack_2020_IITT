from django.conf import settings
from django.db import models
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location_name = models.CharField(max_length=200)
    Coordinates = models.CharField(max_length=200)
    Building_name = models.CharField(max_length=200)
    Floor_number = models.CharField(max_length=200)
    Map_Img = models.ImageField(upload_to='images/')
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.location_name