const BASE_URL = "https://backendapi.turing.com";

export async function getCategoryProducts(id) {
  const response = await fetch(`${BASE_URL}/products/inCategory/${id}`);
  const result = response.json();
  return result;
}

export async function getCategory(id) {
  const response = await fetch(`${BASE_URL}/categories/${id}`);
  const result = response.json();
  return result;
}

export async function getDepartmentProducts(id) {
  const response = await fetch(`${BASE_URL}/products/inDepartment/${id}`);
  const result = response.json();
  return result;
}

export async function getDepartment(id) {
  const response = await fetch(`${BASE_URL}/departments/${id}`);
  const result = response.json();
  return result;
}