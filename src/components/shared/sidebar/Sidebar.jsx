import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { CartContext } from "../../context/cart.context";
import styles from "./sidebar.module.scss";

// https://backendapi.turing.com/categories/inDepartment/1
export default function Sidebar() {
  const { state } = useContext(CartContext);
  const [categories, setCategories] = useState([]);

  const currentCategory = window.location.pathname.includes("category")
    ? parseInt(window.location.pathname.split("/")[2])
    : null;

  useEffect(() => {
    setCategories(state.categories);
  }, [state.categories]);

  console.log(categories);

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
          {categories.length === 0 ? (
            <Loader />
          ) : (
            categories.map(category => (
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
