from django.db import models
from django.contrib.auth.models import User
from django.core import validators


class ExerciseType(models.Model):
    UNIT_CHOICES = (
        ('km', 'Километры'),
        ('m', 'Минуты'),
    )
    name = models.TextField(max_length=128, unique=True)
    unit = models.CharField(max_length=4, choices=UNIT_CHOICES, default='km')
    weight = models.IntegerField(default=0)

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
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING)    # TODO test different on_delete

    def __str__(self):
        return self.date.isoformat()


class TrainingSession(models.Model):
    rest = models.BooleanField()
    day = models.ForeignKey(TrainingDay, on_delete=models.DO_NOTHING)

    def __str__(self):
        return 'Session at {}'.format(self.day.date)


class Exercise(models.Model):
    type = models.ForeignKey(ExerciseType, on_delete=models.DO_NOTHING)
    name = models.TextField(max_length=256, default='')
    distance = models.FloatField(blank=True, default=0.0)
    duration = models.DurationField(blank=True, default=0.0)
    session = models.ForeignKey(TrainingSession, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name
