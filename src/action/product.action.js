const BASE_URL = "https://backendapi.turing.com";

export async function getCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`);
  const result = response.json();
  return result;
}

export async function getDepartment(id) {
  const response = await fetch(`${BASE_URL}/departments/${id}`);
  const result = response.json();
  return result;
}

export async function addReview(payload) {
  const response = await fetch(
    `${BASE_URL}/products/${payload.product_id}/reviews`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "user-key": window.localStorage.getItem("accessToken")
      }
    }
  );

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
