from django.views.decorators.csrf import csrf_exempt
from serializers import *
#from ticketshare.api.permissions import IsOwnerOrReadOnly
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import status

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    filter_fields = ('id', 'first_name', 'last_name')
    # /users/?search=rudy searches across all listed fields
    search_fields = ('first_name', 'last_name', 'about')
    # /users/?ordering=first_name orders by first name alphabetically
    ordering_fields = ('first_name', 'last_name')
    # /users/ default ordering is by the highest id
    ordering = ('-date_joined',)

    @list_route()
    def recent_users(self, request):
        recent_users = UserProfile.objects.all().order_by('-last_login')
        page = self.paginate_queryset(recent_users)
        serializer = self.get_pagination_serializer(page)
        return Response(serializer.data)

class JourneyViewSet(viewsets.ModelViewSet):
   # permission_classes = (IsOwnerOrReadOnly,)
    queryset = Journey.objects.all()
    serializer_class = JourneySerializer
    # one way to filter after username
    filter_fields = ('host__username',)

    @csrf_exempt
    def pre_save(self, obj):
        user = self.request.user
        print user
        obj.host = user

    def get_queryset(self):
        queryset = Journey.objects.all()
        username = self.request.QUERY_PARAMS.get('username', None)
        if username is not None: # Optionally filters against 'username' query param
            queryset = queryset.filter(owner__username=username)
        return queryset

    @detail_route(methods=['post'])
    def attend(self, request, pk):
        journey = Journey.objects.get(pk=pk)
        attendee_id = request.user.id
        journey.attendee.add(attendee_id)
        return Response(status=status.HTTP_200_OK)



