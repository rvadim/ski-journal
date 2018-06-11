# Generated by Django 2.0.6 on 2018-06-11 07:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0003_auto_20170531_2301'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='diary.TrainingSession'),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='diary.ExerciseType'),
        ),
        migrations.AlterField(
            model_name='trainingday',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='trainingsession',
            name='day',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='diary.TrainingDay'),
        ),
    ]