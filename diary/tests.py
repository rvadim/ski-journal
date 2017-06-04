from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from django.utils import timezone
from django.conf import settings
import random
import string
import pytz


class APITest(TestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.client = APIClient()
        self.user = self.create_user()

    def create_user(self):
        return User.objects.create_user('test_user', 'test_user@...', 'test_pass')

    def create_exercise(self, session_id, exercise_type_id, data=None):
        if data is None:
            data = {
                'session': session_id,
                'type': exercise_type_id,
                'duration': 10,
            }
        return self.client.post('/api/exercises/', data)

    def create_exercise_type(self, data=None):
        if data is None:
            data = {
                'name': ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(12)),
            }
        return self.client.post('/api/exercise-types/', data)

    def create_session(self, day_id, data=None):
        if data is None:
            data = {
                'rest': True,
                'day': day_id,
            }
        return self.client.post('/api/sessions/', data)

    def create_training_day(self, data=None):
        if data is None:
            tz = pytz.timezone(settings.TIME_ZONE)
            date = timezone.now()
            data = {
                'date': str(date.astimezone(tz).isoformat()),
                'comments': '',
                'health': 5,
                'sleep': 5,
                'appetite': 5,
                'mood': 5,
                'weather': 'fine',
                'owner': self.user.id
            }
        return self.client.post('/api/days/', data=data)

    def test_create_day(self):
        tz = pytz.timezone(settings.TIME_ZONE)
        date = timezone.now()
        day = {
            'date': str(date.astimezone(tz).isoformat()),
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
        self.assertEqual(date.astimezone(tz).isoformat(), response_day['date'])

    def test_create_session(self):
        day = self.create_training_day().json()
        response = self.create_session(day['id'])
        self.assertEqual(201, response.status_code)
        session_response = response.json()
        self.assertEqual(True, session_response['rest'])
        self.assertEqual(day['id'], session_response['day'])

    def test_create_exercise(self):
        day = self.create_training_day().json()
        session = self.create_session(day['id']).json()
        exercise_type = self.create_exercise_type().json()
        response = self.create_exercise(session['id'], exercise_type['id'])
        self.assertEqual(201, response.status_code)
        exercise_response = response.json()
        self.assertEqual(exercise_type['id'], exercise_response['type'])
        self.assertEqual('00:00:10', exercise_response['duration'])
        self.assertEqual(0.0, exercise_response['distance_low'])
        self.assertEqual(0.0, exercise_response['distance_middle'])
        self.assertEqual(0.0, exercise_response['distance_high'])
        self.assertEqual(session['id'], exercise_response['id'])

    def test_create_exercise_type(self):
        response = self.create_exercise_type()
        self.assertEqual(201, response.status_code)
        self.assertNotEqual('', response.json().get('name'))

    # TODO test filtering
