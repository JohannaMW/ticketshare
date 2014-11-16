from rest_framework import viewsets
from serializers import *

class UserViewSet(viewsets.ModelViewSet):
    # get all the Users
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer


class JourneyViewSet(viewsets.ModelViewSet):
    # get all the Journeys
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer



