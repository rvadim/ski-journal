export {
  doRequest,
  getTrainingDaysData,
  getSessionsByDay,
  getExercisesBySession,
  getExerciseTypesData,
}

function doRequest(url, token, body, method='POST') {
  const init = {
    method: method,
    headers: {
      'X-CSRFTOKEN': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
  return fetch(url, init).then((response) => response)
}

function getTrainingDaysData() {
  const url = 'http://localhost:8000/api/days/'
  return fetch(url).then(response => response.json())
}

function getSessionsByDay(day_id) {
  return fetch('http://localhost:8000/api/sessions/?day=' + day_id)
  .then(response => response.json())
}

function getExercisesBySession(session_id) {
  return fetch('http://localhost:8000/api/exercises/?session=' + session_id)
  .then(response => response.json())
}

function getExerciseTypesData() {
  return fetch('http://localhost:8000/api/exercise-types/')
  .then(response => response.json())
}
