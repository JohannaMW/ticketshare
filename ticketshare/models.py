from django.contrib.auth.models import AbstractUser
from django.db import models


class UserProfile(AbstractUser):
    picture = models.ImageField(null=True, blank=True)
    mobile = models.CharField(max_length=100, null=True, blank=True)
    ticket = models.NullBooleanField()
    long = models.FloatField(null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)

    def __unicode__(self):
        return u"{}".format(self.username)

class Journey(models.Model):
    date = models.DateTimeField()
    depart = models.CharField(max_length=100)
    arrive = models.CharField(max_length=100)
    stopover = models.CharField(max_length=100, null=True, blank=True)
    meeting_point = models.CharField(max_length=100)
    spots = models.IntegerField(default=0, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    host = models.ManyToManyField(UserProfile, related_name="host")
    attendee = models.ForeignKey(UserProfile, related_name="attendee", null=True, blank=True)

    def __unicode__(self):
        return u"{}".format(self.depart)


