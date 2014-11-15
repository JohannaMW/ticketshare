from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, primary_key=True, related_name='profile')
    picture = models.ImageField(null=True, blank=True)
    mobile = models.CharField(max_length=100, null=True, blank=True)
    ticket = models.BooleanField(default=False)
    long = models.FloatField(null=True, blank=True)
    lat = models.FloatField(null=True, blank=True)

    def __unicode__(self):
        return u"{}".format(self.user.username)

    @receiver(post_save, sender=User)
    def create_profile_for_user(sender, instance=None, created=False, **kwargs):
        if created:
            UserProfile.objects.get_or_create(user=instance)

    @receiver(pre_delete, sender=User)
    def delete_profile_for_user(sender, instance=None, **kwargs):
        if instance:
            user_profile = UserProfile.objects.get(user=instance)
            user_profile.delete()


class Journey(models.Model):
    date = models.DateTimeField()
    depart = models.CharField(max_length=100)
    arrive = models.CharField(max_length=100)
    stopover = models.CharField(max_length=100)
    meeting_point = models.CharField(max_length=100)
    spots = models.IntegerField(default=0)
    description = models.TextField()
    host = models.ManyToManyField(UserProfile, related_name="host")
    attendee = models.ForeignKey(UserProfile, related_name="attendee")

    def __unicode__(self):
        return u"{}".format(self.depart)


