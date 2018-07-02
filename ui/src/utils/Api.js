export {
  doRequest,
  getTrainingDaysData,
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
