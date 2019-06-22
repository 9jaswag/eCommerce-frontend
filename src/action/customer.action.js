const BASE_URL = "https://backendapi.turing.com";

export function updateProfile(payload) {
  return fetch(`${BASE_URL}/customer`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "user-key": window.localStorage.getItem("accessToken")
    }
  })
    .then(response => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(response => response);
}

export function updateAddress(payload) {
  return fetch(`${BASE_URL}/customers/address`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "user-key": window.localStorage.getItem("accessToken")
    }
  })
    .then(response => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(response => response);
}

export function updateCreditCard(payload) {
  return fetch(`${BASE_URL}/customers/creditCard`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "user-key": window.localStorage.getItem("accessToken")
    }
  })
    .then(response => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(response => response);
}

export function getRegions() {
  return fetch(`${BASE_URL}/shipping/regions`)
    .then(response => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(response => response);
}

export function getShippingOptions(id) {
  return fetch(`${BASE_URL}/shipping/regions/${id}`)
    .then(response => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(response => response);
}

export async function getOrders() {
  const response = await fetch(`${BASE_URL}/orders/inCustomer`, {
    headers: {
      "user-key": window.localStorage.getItem("accessToken")
    }
  });
  if (!response.ok) {
    throw response.json();
  }

  const result = response.json();
  return result;
}

export async function getOrder(id) {
  const response = await fetch(`${BASE_URL}/orders/${id}`, {
    headers: {
      "user-key": window.localStorage.getItem("accessToken")
    }
  });
  if (!response.ok) {
    throw response.json();
  }

  const result = response.json();
  return result;
}