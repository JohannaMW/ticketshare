from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
from ticketshare.api.views import UserViewSet, JourneyViewSet
from ticketshare.views import UserCreateView

# router = routers.DefaultRouter()
# router.register(r'users', UserViewSet, base_name='users')
# router.register(r'journeys', JourneyViewSet, base_name='journeys')
#
# urlpatterns = patterns('',
#     # Examples:
#     # url(r'^$', 'ticket.views.home', name='home'),
#     url(r'^home/$', 'ticketshare.views.home', name='home'),
#     # url(r'^blog/', include('blog.urls')),
#
#     url(r'^admin/', include(admin.site.urls)),
#
#     #AUTHENTICATION
#     url('^api/v1/users/$', UserCreateView.as_view(), name='user-create'),
#
#     #REST
#     url(r'^', include(router.urls)),
#     url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
# )

urlpatterns = patterns(
     '',
    # ... URLs
    url('^api/v1/users/$', UserCreateView.as_view(), name='user-create'),

    url(r'^', TemplateView.as_view(template_name='base_template.html')),
)