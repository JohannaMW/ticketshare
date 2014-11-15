from rest_framework import serializers
from ticketshare.models import UserProfile, Journey
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 'password'
        )
        write_only_fields = ('password',)

    def restore_object(self, attrs, instance=None):
        user = super(UserSerializer, self).restore_object(attrs, instance)

        password = attrs.get('password', None)

        if password:
            user.set_password(password)

        return user

class JourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Journey

class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='pk', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', required=False)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    journey_host = serializers.SerializerMethodField('get_journey_host')
    journey_attend = serializers.SerializerMethodField('get_journey_attend')

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'journey_attend' , 'journey_host', 'username', 'first_name', 'last_name',
        'picture', 'mobile', 'ticket', 'long', 'lat')

    def restore_object(self, attrs, instance=None):
        profile = super(UserProfileSerializer, self).restore_object(
            attrs, instance
        )
        if profile:
            user = profile.user
            user.email = attrs.get('user.email', user.email)
            user.first_name = attrs.get('user.first_name', user.first_name)
            user.last_name = attrs.get('user.last_name', user.last_name)

            user.save()
        return profile

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
