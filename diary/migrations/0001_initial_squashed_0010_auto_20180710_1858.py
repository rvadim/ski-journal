# Generated by Django 2.0.6 on 2018-09-09 13:18

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    replaces = [('diary', '0001_initial'), ('diary', '0002_auto_20170531_2257'), ('diary', '0003_auto_20170531_2301'), ('diary', '0004_auto_20180611_1425'), ('diary', '0005_auto_20180704_1359'), ('diary', '0006_auto_20180704_2154'), ('diary', '0007_auto_20180705_1501'), ('diary', '0008_trainingplan_owner'), ('diary', '0009_exerciseplan_month_plan'), ('diary', '0010_auto_20180710_1858')]

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
                ('name', models.TextField(max_length=128, unique=True)),
                ('unit', models.CharField(choices=[('km', 'Километры'), ('m', 'Минуты')], default='km', max_length=4)),
                ('weight', models.IntegerField(default=0)),
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
                ('day', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='diary.TrainingDay')),
            ],
        ),
        migrations.AddField(
            model_name='exercise',
            name='session',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='diary.TrainingSession'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='diary.ExerciseType'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='name',
            field=models.TextField(default='', max_length=256),
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='distance_high',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='distance_low',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='distance_middle',
        ),
        migrations.AlterField(
            model_name='trainingday',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='exercise',
            name='distance',
            field=models.FloatField(blank=True, default=0.0),
        ),
        migrations.AlterField(
            model_name='exercise',
            name='duration',
            field=models.DurationField(blank=True, default=0.0),
        ),
        migrations.CreateModel(
            name='ExercisePlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distance', models.FloatField(blank=True, default=0.0)),
                ('duration', models.DurationField(blank=True, default=0.0)),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='diary.ExerciseType')),
            ],
        ),
        migrations.CreateModel(
            name='MonthPlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='TrainingPlan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='My training plan', max_length=256)),
                ('owner', models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='monthplan',
            name='plan',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='diary.TrainingPlan'),
        ),
        migrations.AddField(
            model_name='exerciseplan',
            name='month_plan',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='diary.MonthPlan'),
        ),
        migrations.AlterModelOptions(
            name='exercisetype',
            options={'permissions': {('view', 'Can see available Exercise Types')}},
        ),
    ]