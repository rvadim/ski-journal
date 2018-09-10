from django.contrib import admin

from diary.models import TrainingDay
from diary.models import TrainingSession
from diary.models import Exercise
from diary.models import ExerciseType
from diary.models import TrainingPlan
from diary.models import MonthPlan
from diary.models import ExercisePlan


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


class TrainingPlanAdmin(admin.ModelAdmin):
    pass


class MonthPlanAdmin(admin.ModelAdmin):
    pass


class ExercisePlanAdmin(admin.ModelAdmin):
    search_fields = (
        'month_plan__plan__name',
    )
    list_display = ('month_plan', 'type', 'distance', 'duration')
    list_editable = ('type', 'distance', 'duration')


admin.site.register(TrainingDay, TrainingDayAdmin)
admin.site.register(TrainingSession, TrainingSessionAdmin)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(ExerciseType, ExerciseTypeAdmin)

admin.site.register(TrainingPlan, TrainingPlanAdmin)
admin.site.register(MonthPlan, MonthPlanAdmin)
admin.site.register(ExercisePlan, ExercisePlanAdmin)
