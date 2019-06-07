import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const categoriesURL = "https://backendapi.turing.com/categories";
  const [categories, setCategories] = useState({
    count: 0,
    rows: []
  });

  const fetchCategories = async () => {
    const response = await fetch(categoriesURL)
      .then(response => response.json())
      .then(response => response);

    setCategories(response);
  };
  fetchCategories();

  return (
    <aside className="menu">
      <p className="menu-label is-size-6-desktop is-size-7-touch">Categories</p>
      <ul className="menu-list">
        {categories.count === 0
          ? null
          : categories.rows.map(category => (
              <li key={category.category_id}>
                <Link to={`/category/${category.category_id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
      </ul>
    </aside>
  );
}
