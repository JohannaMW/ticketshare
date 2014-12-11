from rest_framework import serializers
from ticketshare.models import UserProfile, Journey

class UserSerializer(serializers.ModelSerializer):
    journey_host = serializers.SerializerMethodField('get_journey_host')
    journey_attend = serializers.SerializerMethodField('get_journey_attend')

    class Meta:
        model = UserProfile
        fields = ('id', 'password', 'journey_attend' , 'journey_host', 'username', 'first_name', 'last_name',
        'picture', 'mobile', 'ticket', 'long', 'lat')
        write_only_fields = ('password',)

    def get_journey_host(self, obj):
        return Journey.objects.filter(host=obj).values()

    def get_journey_attend(self, obj):
        return Journey.objects.filter(attendee=obj).values()

class JourneySerializer(serializers.ModelSerializer):
    host = UserSerializer(read_only=True)
    class Meta:
        model = Journey