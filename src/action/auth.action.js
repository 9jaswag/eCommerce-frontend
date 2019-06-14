const BASE_URL = 'https://backendapi.turing.com'

export function login(payload) {
  return fetch(
    `${BASE_URL}/customers/login`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(response => response)
}

export function register(payload) {
  return fetch(
    `${BASE_URL}/customers`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(response => response)
}

export function getUser() {
  return fetch(`${BASE_URL}/customer`, {
    headers: {
      'user-key': window.localStorage.getItem('accessToken')
    }
  })
    .then(response => response.json())
    .then(response => response)
}