import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

export default function() {
  useEffect(() => {
    const body = document.querySelector("body");
    body.onclick = event => {
      const {
        target: { className }
      } = event;
      if (
        className.includes("modal-background") ||
        className.includes("modal-close")
      ) {
        event.target.parentElement.classList.remove("is-active");
      }
    };
  }, []);

  const onClick = event => {
    const {
      target: {
        dataset: { name }
      }
    } = event;

    const modal = document.querySelector(`.modal.${name}`);
    modal.classList.add("is-active");
  };

  return (
    <>
      <div className="navbar-item">
        <div className="buttons">
          <Link
            to="#"
            onClick={onClick}
            data-name="signup"
            className="button is-uppercase is-primary"
          >
            Sign up
          </Link>
          <Link
            to="#"
            onClick={onClick}
            data-name="login"
            className="button is-uppercase is-light"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* stuff */}
      <AuthModal name="signup" />
      <AuthModal name="login" />
    </>
  );
}
