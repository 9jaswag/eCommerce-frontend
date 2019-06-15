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
