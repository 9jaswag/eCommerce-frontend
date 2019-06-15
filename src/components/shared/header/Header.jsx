import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/shoppy-white.png";
import styles from "./header.module.scss";
import AuthHeaderItems from "./AuthHeaderItems";
import AuthUserItems from "./AuthUserItems";
import HeaderLink from "./HeaderLink";
import { AuthContext } from "../../context/authContext";

export default function() {
  const [departments, setDepartments] = useState([]);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch("https://backendapi.turing.com/departments")
        .then(response => response.json())
        .then(response => response);

      setDepartments(response);
    };
    fetchDepartments();
  }, []);

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
        </div>
      </div>
    </nav>
  );
}
