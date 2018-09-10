import logging
from rest_framework.filters import BaseFilterBackend

log = logging.getLogger(__name__)


class ObjectPermissionBackend:

    def has_perm(self, user_obj, perm, obj=None):
        # Add permissions
        log.error('{}:{}:{}'.format(user_obj, perm, obj))
        if not obj and (perm == 'diary.add_trainingday'
                        or perm == 'diary.add_trainingsession'
                        or perm == 'diary.add_exercise'):
            return True

        if not obj:
            return False

        if hasattr(obj, 'owner') and obj.owner.id == user_obj.pk:
            return True
        if hasattr(obj, 'day') and obj.day.owner.id == user_obj.pk:
            return True
        if hasattr(obj, 'session') and obj.session.day.owner.id == user_obj.pk:
            return True

        if perm == 'view' and obj.__class__.__name__ == 'ExerciseType':
            return True
        return False


class ObjectFilteringBackend:

    def filter_queryset(self, request, queryset, view):
        log.error('check')
