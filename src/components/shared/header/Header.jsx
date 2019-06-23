import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../../assets/images/shoppy-white.png";
import styles from "./header.module.scss";
import AuthHeaderItems from "./AuthHeaderItems";
import AuthUserItems from "./AuthUserItems";
import HeaderLink from "./HeaderLink";
import { AuthContext } from "../../context/auth.context";
import { actions, CartContext } from "../../context/cart.context";
import { createCart, getCartItems } from "../../../action/cart.action";

function Header(props) {
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
      const generateCart = async () => {
        const response = await createCart();

        dispatch(actions.SET_CART_ID(response.cart_id));
        window.localStorage.setItem("cartId", response.cart_id);
      };

      generateCart();
    }

    if (cartState.cartId) {
      const fetchCartItems = async () => {
        const response = await getCartItems(cartState.cartId);

        dispatch(actions.SET_CART_ITEMS(response));
      };

      fetchCartItems();
    }
  }, [cartState.cartId, dispatch]);

  const toggleMobileNav = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("#" + burger.dataset.target);
    burger.classList.toggle("is-active");
    nav.classList.toggle("is-active");
  };

  const onSearch = event => {
    event.preventDefault();
    const { target } = event;
    const element = target.querySelector("input");

    props.history.push(`/search?q=${element.value}`);
  };

  return (
    <nav
      className="navbar is-primary is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container is-fluid">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} alt="Shoppy logo" width={112} height={28} />
          </Link>
          <button
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-toggle"
            onClick={toggleMobileNav}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
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
              <form onSubmit={onSearch}>
                <p className="control has-icons-left">
                  <input
                    className={`input ${styles.input}`}
                    type="search"
                    placeholder="Search anything"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-search" />
                  </span>
                </p>
              </form>
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
                  <span className={styles.cart_tag}>
                    {cartState.cartItems.length}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Header);
