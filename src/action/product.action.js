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