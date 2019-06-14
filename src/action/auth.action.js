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