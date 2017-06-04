from rest_framework import serializers
from diary.models import TrainingDay
from diary.models import TrainingSession
from diary.models import Exercise
from diary.models import ExerciseType


class TrainingDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingDay
        fields = ('id', 'date', 'comments', 'health', 'sleep', 'appetite', 'mood', 'weather', 'owner', )


class TrainingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingSession
        fields = ('id', 'rest', 'day',)


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'name', 'type', 'distance_low', 'distance_middle', 'distance_high', 'duration', 'session',)


class ExerciseTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseType
        fields = ('id', 'name',)
