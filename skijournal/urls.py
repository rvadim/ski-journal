from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import login, logout
from health.views import health

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^auth/', include('social_django.urls', namespace='social')),
    url(r'^api/', include('diary.urls')),
    url(r'^_ah/health', health, name='home')
]
