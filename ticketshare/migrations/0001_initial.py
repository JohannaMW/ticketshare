# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Journey',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField()),
                ('depart', models.CharField(max_length=100)),
                ('arrive', models.CharField(max_length=100)),
                ('stopover', models.CharField(max_length=100)),
                ('meeting_point', models.CharField(max_length=100)),
                ('spots', models.IntegerField(default=0)),
                ('description', models.TextField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(related_name='profile', primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('picture', models.ImageField(null=True, upload_to=b'', blank=True)),
                ('mobile', models.CharField(max_length=100, null=True, blank=True)),
                ('ticket', models.BooleanField(default=False)),
                ('long', models.FloatField(null=True, blank=True)),
                ('lat', models.FloatField(null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='journey',
            name='attendee',
            field=models.ForeignKey(related_name='attendee', to='ticketshare.UserProfile'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='journey',
            name='host',
            field=models.ManyToManyField(related_name='host', to='ticketshare.UserProfile'),
            preserve_default=True,
        ),
    ]
