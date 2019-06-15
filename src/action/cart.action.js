const BASE_URL = "https://backendapi.turing.com";

export async function createCart() {
  const response = await fetch(`${BASE_URL}/shoppingcart/generateUniqueId`);
  const result = response.json();
  return result;
}
