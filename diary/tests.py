from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from django.utils import timezone
from django.conf import settings
from diary.models import TrainingDay, ExerciseType, TrainingSession, Exercise
import random
import string
import pytz

import logging
logging.basicConfig()
log = logging.getLogger(__name__)


class APITest(TestCase):
    fixtures = ['ExerciseTypes.json']

    def setUp(self):
        # Every test needs access to the request factory.
        self.client = APIClient()
        self.user = self.create_user()
        self.owner = self.create_user('test_user1')
        self.et = ExerciseType.objects.get(pk=1)

    def create_user(self, name='test_user'):
        return User.objects.create_user(name, '{}@...'.format(name), 'test_pass')

    def create_exercise(self, session_id, exercise_type_id, data=None):
        if data is None:
            data = {
                'session': session_id,
                'type': exercise_type_id,
                'duration': 10,
            }
        return self.client.post('/api/exercises', data)

    def create_exercise_type(self, data=None):
        if data is None:
            data = {
                'name': ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(12)),
            }
        return self.client.post('/api/exercise-types', data)

    def create_session(self, day_id, data=None):
        if data is None:
            data = {
                'rest': True,
                'day': day_id,
            }
        return self.client.post('/api/sessions', data)

    def create_training_day(self, data=None):
        if data is None:
            tz = pytz.timezone(settings.TIME_ZONE)
            date = timezone.now()
            data = {
                'date': str(date.astimezone(tz).date()),
                'comments': '',
                'health': 5,
                'sleep': 5,
                'appetite': 5,
                'mood': 5,
                'weather': 'fine',
                'owner': self.user.id
            }
        resp = self.client.post('/api/days', data=data)
        if resp.status_code not in [200, 201]:
            log.error(resp.content)
        return resp

    def test_create_day(self):
        self.client.login(username='test_user', password='test_pass')
        tz = pytz.timezone(settings.TIME_ZONE)
        date = timezone.now()
        day = {
            'date': str(date.astimezone(tz).date()),
            'comments': '',
            'health': 5,
            'sleep': 5,
            'appetite': 5,
            'mood': 5,
            'weather': 'fine',
            'owner': self.user.id
        }
        response = self.create_training_day(day)
        self.assertEqual(201, response.status_code)
        response_day = response.json()
        self.assertEqual('', response_day['comments'])
        self.assertEqual(5, response_day['health'])
        self.assertEqual(5, response_day['sleep'])
        self.assertEqual(5, response_day['appetite'])
        self.assertEqual(5, response_day['mood'])
        self.assertEqual('fine', response_day['weather'])
        self.assertEqual(self.user.id, response_day['owner'])
        self.assertEqual(str(date.astimezone(tz).date()), response_day['date'])

    def test_create_session(self):
        self.client.login(username='test_user', password='test_pass')
        day = self.create_training_day().json()
        response = self.create_session(day['id'])
        self.assertEqual(201, response.status_code)
        session_response = response.json()
        self.assertEqual(True, session_response['rest'])
        self.assertEqual(day['id'], session_response['day'])

    def test_create_exercise(self):
        self.client.login(username='test_user', password='test_pass')
        day = self.create_training_day().json()
        session = self.create_session(day['id']).json()
        response = self.create_exercise(session['id'], 1)
        self.assertEqual(201, response.status_code)
        exercise_response = response.json()
        self.assertEqual(1, exercise_response['type'])
        self.assertEqual('00:00:10', exercise_response['duration'])
        self.assertEqual(0.0, exercise_response['distance'])
        self.assertEqual(session['id'], exercise_response['id'])

    def test_list_training_days(self):
        self.client.login(username='test_user', password='test_pass')
        tz = pytz.timezone(settings.TIME_ZONE)
        date = timezone.now()
        day = {
            'date': str(date.astimezone(tz).date()),
            'comments': '',
            'health': 5,
            'sleep': 5,
            'appetite': 5,
            'mood': 5,
            'weather': 'fine',
            'owner': self.user.id
        }
        response = self.create_training_day(day)
        self.assertEqual(201, response.status_code)
        days = self.client.get('/api/days')
        self.assertEquals(len(days.json()), 1)

        self.client.login(username='test_user1', password='test_pass')
        days = self.client.get('/api/days')
        self.assertEquals(len(days.json()), 1)
        log.error(days.json())
        log.error(self.owner.id)

    # TODO test filtering


class TestPermissions(TestCase):
    fixtures = ['ExerciseTypes.json']

    def setUp(self):
        user = User(username='user')
        user.save()
        owner = User(username='owner')
        owner.save()
        self.user = User.objects.get(username__exact='user')
        self.owner = User.objects.get(username__exact='owner')

    def tearDown(self):
        self.user.delete()
        self.owner.delete()

    def validate_permissions(self, user, with_access, with_deny):
        self.assertTrue(user.has_perm('view', with_access))
        self.assertTrue(user.has_perm('change', with_access))
        self.assertTrue(user.has_perm('delete', with_access))

        self.assertFalse(user.has_perm('view', with_deny))
        self.assertFalse(user.has_perm('change', with_deny))
        self.assertFalse(user.has_perm('delete', with_deny))

    def test_object_permissions_for_users(self):
        et1 = ExerciseType.objects.get(pk=1)
        date = timezone.now()
        td = TrainingDay(date=date, comments='', health=5, sleep=5, appetite=5, mood=5, weather='fine',
                         owner=self.owner)
        td.save()
        td1 = TrainingDay(date=date, comments='', health=5, sleep=5, appetite=5, mood=5, weather='fine',
                          owner=self.user)
        td1.save()
        self.validate_permissions(self.owner, td, td1)
        self.validate_permissions(self.user, td1, td)
        ts = TrainingSession(rest=False, day=td)
        ts1 = TrainingSession(rest=False, day=td1)
        self.validate_permissions(self.owner, ts, ts1)
        self.validate_permissions(self.user, ts1, ts)
        e = Exercise(type=et1, name='my name', distance=1, duration=1, session=ts)
        e1 = Exercise(type=et1, name='my name1', distance=1, duration=1, session=ts1)
        self.validate_permissions(self.owner, e, e1)
        self.validate_permissions(self.user, e1, e)

    def test_exercise_type(self):
        et1 = ExerciseType.objects.get(pk=1)
        et2 = ExerciseType.objects.get(pk=2)
        self.assertTrue(self.user.has_perm('view', et1))
        self.assertTrue(self.user.has_perm('view', et2))
        self.assertFalse(self.user.has_perm('change', et1))
        self.assertFalse(self.user.has_perm('change', et2))
        self.assertFalse(self.user.has_perm('delete', et1))
        self.assertFalse(self.user.has_perm('delete', et2))
