from rest_framework import serializers
from ticketshare.models import User, Journey


class JourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journey

class UserSerializer(serializers.ModelSerializer):
    journey_host = serializers.SerializerMethodField('get_journey_host')
    journey_attend = serializers.SerializerMethodField('get_journey_attend')

    class Meta:
        model = User
        fields = ('id', 'password', 'journey_attend' , 'journey_host', 'username', 'first_name', 'last_name',
        'picture', 'mobile', 'ticket', 'long', 'lat')

    def get_journey_host(self, obj):
        return obj.host.count()

    def get_journey_attend(self, obj):
        return Journey.objects.filter(attendee=obj).values()

    def validate_password(self, attrs, source):
        username = attrs['username']
        password = attrs[source]
        if password == username:
            raise serializers.ValidationError("Password can not be same as username!")
        if len(password)<4:
            raise serializers.ValidationError("Password is too short!")
        return attrs
