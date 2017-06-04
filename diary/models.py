from django.db import models
from django.contrib.auth.models import User
from django.core import validators


class ExerciseType(models.Model):
    name = models.TextField(max_length=128, unique=True)

    def __str__(self):
        return self.name


class TrainingDay(models.Model):
    date = models.DateTimeField()
    comments = models.TextField(max_length=256, blank=True, null=False)
    health = models.IntegerField(validators=[validators.MaxValueValidator(5), validators.MinValueValidator(1)])
    sleep = models.IntegerField(validators=[validators.MaxValueValidator(5), validators.MinValueValidator(1)])
    appetite = models.IntegerField(validators=[validators.MaxValueValidator(5), validators.MinValueValidator(1)])
    mood = models.IntegerField(validators=[validators.MaxValueValidator(5), validators.MinValueValidator(1)])
    weather = models.TextField(max_length=16)
    owner = models.ForeignKey(User)

    def __str__(self):
        return self.date.isoformat()


class TrainingSession(models.Model):
    rest = models.BooleanField()
    day = models.ForeignKey(TrainingDay)

    def __str__(self):
        return 'Session at {}'.format(self.day.date)


class Exercise(models.Model):
    type = models.ForeignKey(ExerciseType)
    name = models.TextField(max_length=256, default='')
    distance_low = models.FloatField(blank=True, default=0.0)
    distance_middle = models.FloatField(blank=True, default=0.0)
    distance_high = models.FloatField(blank=True, default=0.0)
    duration = models.DurationField()
    session = models.ForeignKey(TrainingSession)

    def __str__(self):
        return self.name
