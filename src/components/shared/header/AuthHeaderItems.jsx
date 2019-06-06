import React from "react";
import { Link } from "react-router-dom";

export default function() {
  return (
    <div className="navbar-item">
      <div className="buttons">
        <Link to="/" className="button is-primary">
          <strong>Sign up</strong>
        </Link>
        <Link to="/" className="button is-light">
          Log in
        </Link>
      </div>
    </div>
  );
}
