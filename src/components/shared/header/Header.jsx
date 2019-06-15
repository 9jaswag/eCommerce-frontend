import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/shoppy-white.png";
import styles from "./header.module.scss";
import AuthHeaderItems from "./AuthHeaderItems";
import AuthUserItems from "./AuthUserItems";
import HeaderLink from "./HeaderLink";
import { AuthContext } from "../../context/auth.context";
import { actions, CartContext } from "../../context/cart.context";
import { createCart } from "../../../action/cart.action";

export default function() {
  const [departments, setDepartments] = useState([]);
  const { state } = useContext(AuthContext);
  const { state: cartState, dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch("https://backendapi.turing.com/departments")
        .then(response => response.json())
        .then(response => response);

      setDepartments(response);
    };
    fetchDepartments();

    const cartId = window.localStorage.getItem("cartId");

    if (cartId && !cartState.cartId) {
      dispatch(actions.SET_CART_ID(cartId));
    }

    if (!cartState.cartId && !cartId) {
      const fetchCart = async () => {
        const response = await createCart();

        console.log(response);
        dispatch(actions.SET_CART_ID(response.cart_id));
        window.localStorage.setItem("cartId", response.cart_id);
      };

      fetchCart();
    }
  }, [cartState, dispatch]);

  console.log(cartState);

  const toggleMobileNav = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("#" + burger.dataset.target);
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-active");
  };

  return (
    <nav
      className="navbar is-primary is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} alt="Shoppy logo" width={112} height={28} />
        </Link>
        <Link
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-toggle"
          to="#"
          onClick={toggleMobileNav}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </Link>
      </div>
      <div id="navbar-toggle" className="navbar-menu">
        <div className="navbar-end">
          {departments.map(department => (
            <HeaderLink
              key={department.department_id}
              path={`/department/${department.department_id}`}
              value={department.name}
            />
          ))}
          <div className="navbar-item">
            <p className="control has-icons-left">
              <input
                className={`input ${styles.input}`}
                type="search"
                placeholder="Search anything"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search" />
              </span>
            </p>
          </div>
          {state.isAuthenticated ? (
            <AuthUserItems name={state.user.name} />
          ) : (
            <AuthHeaderItems />
          )}
          <div className="navbar-item">
            <Link to="/cart" className="">
              <span className="is-relative">
                <span className="icon">
                  <i className={`fas fa-lg fa-shopping-bag ${styles.icon}`} />
                </span>
                <span className={styles.cart_tag}>2</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
