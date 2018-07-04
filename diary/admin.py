from django.contrib import admin

from diary.models import TrainingDay
from diary.models import TrainingSession
from diary.models import Exercise
from diary.models import ExerciseType

# from guardian.admin import GuardedModelAdmin


class TrainingDayAdmin(admin.ModelAdmin):
    pass


class TrainingSessionAdmin(admin.ModelAdmin):
    pass


class ExerciseAdmin(admin.ModelAdmin):
    pass


class ExerciseTypeAdmin(admin.ModelAdmin):
    ordering = ('weight',)
    list_display = ('id', 'name', 'unit', 'weight')
    list_editable = ('weight', 'unit')


admin.site.register(TrainingDay, TrainingDayAdmin)
admin.site.register(TrainingSession, TrainingSessionAdmin)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(ExerciseType, ExerciseTypeAdmin)
