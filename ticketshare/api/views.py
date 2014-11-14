from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import status
from ticketshare.api.permissions import IsOwnerOrReadOnly
from ticketshare.models import *
from serializers import *

class UserViewSet(viewsets.ModelViewSet):
    # get all the Users
    queryset = User.objects.all()
    serializer_class = UserSerializer

class JourneyViewSet(viewsets.ModelViewSet):
    # get all the Journeys
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer



