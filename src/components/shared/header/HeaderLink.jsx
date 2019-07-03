import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLink({ path, value, isActive = false }) {
  return (
    <Link
      to={path}
      className={`navbar-item is-uppercase has-text-weight-semibold ${
        isActive ? "is-active" : ""
      }`}
    >
      {value}
    </Link>
  );
}
