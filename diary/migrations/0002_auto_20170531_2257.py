# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-31 15:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='name',
            field=models.TextField(default='', max_length=256),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='distance_high',
            field=models.FloatField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='distance_low',
            field=models.FloatField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='distance_middle',
            field=models.FloatField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='exercisetype',
            name='name',
            field=models.TextField(max_length=32, unique=True),
        ),
    ]