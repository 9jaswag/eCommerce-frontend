import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  const categoriesURL = "https://backendapi.turing.com/categories";
  const [categories, setCategories] = useState({
    count: 0,
    rows: []
  });
  const currentCategory = parseInt(window.location.pathname.split("/")[2]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(categoriesURL)
        .then(response => response.json())
        .then(response => response);

      setCategories(response);
    };
    fetchCategories();
  }, [categoriesURL]);

  const toggleMenu = () => {
    const categoryMenu = document.querySelector(".menu-list.category-menu");
    categoryMenu.classList.toggle("is-hidden-mobile");
  };

  return (
    <aside className="menu">
      <p className="menu-label is-size-6-desktop is-size-6-touch has-text-weight-semibold">
        Categories
        <span className="icon is-large is-hidden-tablet" onClick={toggleMenu}>
          <i className="fas fa-angle-down" aria-hidden="true" />
        </span>
      </p>
      <div className={`${styles.mobile_absolute}`}>
        <ul className="menu-list category-menu is-hidden-mobile">
          {categories.count === 0 ? (
            <Loader />
          ) : (
            categories.rows.map(category => (
              <li
                key={category.category_id}
                className="body-font has-text-weight-medium is-uppercase"
              >
                <Link
                  to={`/category/${category.category_id}`}
                  className={
                    category.category_id === currentCategory
                      ? "has-background-light"
                      : ""
                  }
                >
                  {category.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}
