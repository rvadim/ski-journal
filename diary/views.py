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
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from datetime import timedelta


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


class MonthReport(ViewSet):

    def list(self, request, format=None):
        # TODO:
        # * Всего Б.Х.И
        # * Всего бега
        # * Всего роллеров
        # * Всего лыж
        # * Всего ОФП
        # * Всего тренировочных часов
        days = TrainingDay.objects.all()
        sessions = []
        for day in days:
            sessions += day.trainingsession_set.all()
        output = [
            {'name': 'Тренировочные дни', 'value': len(days), 'unit': 'Days', 'weight': 0},
            {'name': 'Тренировки', 'value': len(sessions), 'unit': 'Days', 'weight': 1},
        ]
        exercises = []
        for session in sessions:
            exercises += session.exercise_set.all()

        for exercise_type in ExerciseType.objects.all():
            exercises_of_this_type = filter(lambda e: exercise_type.id == e.type.id, exercises)
            if exercise_type.unit == 'km':
                whole_sum = 0
                for exercise in exercises_of_this_type:
                    whole_sum += exercise.distance
                output.append({'name': exercise_type.name, 'value': whole_sum, 'unit': 'Kilimeters'})
            else:
                whole_sum = timedelta(hours=0)
                for exercise in exercises_of_this_type:
                    whole_sum += exercise.duration
                output.append({'name': exercise_type.name,
                               'value': whole_sum.total_seconds(),
                               'unit': 'Seconds',
                               'weight': exercise_type.weight})

        return Response(output)
