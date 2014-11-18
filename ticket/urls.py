from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
from ticketshare.api.views import UserViewSet, JourneyViewSet
from ticketshare import api

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='users')
router.register(r'journeys', JourneyViewSet, base_name='journeys')

urlpatterns = patterns('',
    url(r'^home/$', 'ticketshare.views.home', name='home'),
    url(r'^map/$', TemplateView.as_view(template_name="map.html"), name="map"),

    # JS Calls
    url(r'^set_position/$', 'ticketshare.views.set_position', name='set_position'),
    url(r'^get_user/$', 'ticketshare.views.get_user', name='get_user'),

    # User Authentification
    url(r'^register/$', 'ticketshare.views.register', name='register'),
    url(r'^login/$', 'django.contrib.auth.views.login', name='login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', name='logout'),
    url(r'^admin/', include(admin.site.urls)),

    #REST
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)
