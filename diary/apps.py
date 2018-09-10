from django.apps import AppConfig
from django.contrib.auth.models import Group
from django.db.models.signals import post_save
from django.conf import settings


def add_to_default_group(sender, **kwargs):
    user = kwargs["instance"]
    if kwargs["created"]:
        group = Group.objects.get(name='WatchExerciseType')
        user.groups.add(group)


class DiaryConfig(AppConfig):
    name = 'diary'

    def ready(self):
        post_save.connect(add_to_default_group, sender=settings.AUTH_USER_MODEL)
