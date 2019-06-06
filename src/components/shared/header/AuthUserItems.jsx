import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.scss";

export default function({ name }) {
  return (
    <>
      <div className="navbar-item has-dropdown is-hoverable">
        <Link to="/" className="navbar-link">
          Hi &nbsp;<span className="has-text-weight-semibold">{name}</span>
        </Link>
        <div className="navbar-dropdown">
          <Link to="/" className="navbar-item">
            My Bag
          </Link>
          <Link to="/" className="navbar-item">
            Profile
          </Link>
          <hr className="navbar-divider" />
          <Link to="/" className="navbar-item">
            Logout
          </Link>
        </div>
      </div>
      <div className="navbar-item">
        <Link to="/" className="navbar-iten">
          <span className="is-relative">
            <span className="icon">
              <i className={`fas fa-lg fa-shopping-bag ${styles.icon}`} />
            </span>
            <span className={styles.cart_tag}>2</span>
          </span>
        </Link>
      </div>
    </>
  );
}
