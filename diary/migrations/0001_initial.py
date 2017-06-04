# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-30 04:55
from __future__ import unicode_literals

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distance_low', models.FloatField()),
                ('distance_middle', models.FloatField()),
                ('distance_high', models.FloatField()),
                ('duration', models.DurationField()),
            ],
        ),
        migrations.CreateModel(
            name='ExerciseType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='TrainingDay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('comments', models.TextField(blank=True, max_length=256)),
                ('health', models.IntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)])),
                ('sleep', models.IntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)])),
                ('appetite', models.IntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)])),
                ('mood', models.IntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)])),
                ('weather', models.TextField(max_length=16)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TrainingSession',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rest', models.BooleanField()),
                ('day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.TrainingDay')),
            ],
        ),
        migrations.AddField(
            model_name='exercise',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.TrainingSession'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.ExerciseType'),
        ),
    ]
