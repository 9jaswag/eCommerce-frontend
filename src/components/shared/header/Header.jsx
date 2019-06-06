import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/shoppy-white.png";
import styles from "./header.module.scss";
import AuthHeaderItems from "./AuthHeaderItems";
import AuthUserItems from "./AuthUserItems";

export default function() {
  useEffect(() => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("#" + burger.dataset.target);
    burger.onclick = event => {
      burger.classList.toggle("is-active");
      nav.classList.toggle("is-active");
    };
  });

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
          to=""
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </Link>
      </div>
      <div id="navbar-toggle" className="navbar-menu">
        <div className="navbar-end">
          <Link
            to="/"
            className="navbar-item is-uppercase has-text-weight-semibold"
          >
            Regional
          </Link>
          <Link
            to="/"
            className="navbar-item is-uppercase has-text-weight-semibold"
          >
            Nature
          </Link>
          <Link
            to="/"
            className="navbar-item is-uppercase has-text-weight-semibold"
          >
            Seasonal
          </Link>
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
          {true ? <AuthUserItems name={"User"} /> : <AuthHeaderItems />}
        </div>
      </div>
    </nav>
  );
}
