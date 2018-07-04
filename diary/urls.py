from django.conf.urls import url, include
from rest_framework import routers
from diary import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'days', views.TrainingDayViewSet)
router.register(r'sessions', views.TrainingSessionViewSet)
router.register(r'exercises', views.ExerciseViewSet)
router.register(r'exercise-types', views.ExerciseTypeViewSet)
router.register(r'month-report', views.MonthReport, base_name='monthreport')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework'))
]
