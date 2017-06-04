from rest_framework import viewsets
from diary.models import TrainingDay
from diary.models import TrainingSession
from diary.models import Exercise
from diary.models import ExerciseType
from diary.serializers import TrainingDaySerializer
from diary.serializers import TrainingSessionSerializer
from diary.serializers import ExerciseSerializer
from diary.serializers import ExerciseTypeSerializer
from django_filters.rest_framework import DjangoFilterBackend


class TrainingDayViewSet(viewsets.ModelViewSet):
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('id', 'owner')


class TrainingSessionViewSet(viewsets.ModelViewSet):
    queryset = TrainingSession.objects.all()
    serializer_class = TrainingSessionSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('id', 'day', 'rest')


class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('session', )


class ExerciseTypeViewSet(viewsets.ModelViewSet):
    queryset = ExerciseType.objects.all()
    serializer_class = ExerciseTypeSerializer
    filter_backends = (DjangoFilterBackend,)
