# Generated by Django 2.0.6 on 2018-09-09 13:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0001_initial_squashed_0010_auto_20180710_1858'),
    ]

    operations = [
        migrations.AddField(
            model_name='trainingsession',
            name='time',
            field=models.TimeField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='trainingday',
            name='date',
            field=models.DateField(),
        ),
    ]
