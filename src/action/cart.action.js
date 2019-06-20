const BASE_URL = "https://backendapi.turing.com";

export async function createCart() {
  const response = await fetch(`${BASE_URL}/shoppingcart/generateUniqueId`);
  const result = response.json();
  return result;
}

export async function addToCart(payload) {
  const response = await fetch(`${BASE_URL}/shoppingcart/add`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const result = response.json();
  return result;
}

export async function getCartItems(id) {
  const response = await fetch(`${BASE_URL}/shoppingcart/${id}`);
  const result = response.json();
  return result;
}

export async function updateCartItem(payload) {
  const { itemId: item_id, quantity } = payload;
  const response = await fetch(`${BASE_URL}/shoppingcart/update/${item_id}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const result = response.json();
  return result;
}

export async function deleteCartItem(item_id) {
  const response = await fetch(
    `${BASE_URL}/shoppingcart/removeProduct/${item_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

export async function getCartTotal(id) {
  const response = await fetch(`${BASE_URL}/shoppingcart/totalAmount/${id}`);
  if (!response.ok) {
    throw response.json();
  }

  const result = response.json();
  return result;
}

export async function createOrder(payload) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "user-key": window.localStorage.getItem("accessToken")
    }
  });
  if (!response.ok) {
    throw response.json();
  }

  const result = response.json();
  return result;
}


export async function processPayment(payload) {
  const response = await fetch(`${BASE_URL}/stripe/charge`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      "user-key": window.localStorage.getItem("accessToken")
    }
  });
  if (!response.ok) {
    throw response.json();
  }

  const result = response.json();
  return result;
}