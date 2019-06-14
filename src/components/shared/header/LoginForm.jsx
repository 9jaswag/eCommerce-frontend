import React, { useState } from "react";
import logo from "../../../assets/images/shoppy.png";
import styles from "./header.module.scss";
import DisplayError from "../../shared/error/DisplayError";

export default function LoginForm() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const onChange = event => {
    const {
      target: { name, value }
    } = event;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const onSubmit = async event => {
    event.preventDefault();
    setError(null);

    const { email, password } = userDetails;

    if (email.trim().length < 1 || password.trim().length < 6) {
      setError("fill all fields appropriately");
      return;
    }

    const payload = { email, password };

    try {
      const response = await fetch(
        "https://backendapi.turing.com/customers/login",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(response => response);

      console.log(response);
      // redrirect to homepage
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="section">
      <div className="columns">
        <div className="column has-background-white is-8 is-offset-2">
          <div className="card">
            <form className="heading-font" onSubmit={onSubmit}>
              <div className="card-content">
                <div className="content">
                  <div className={`${styles.auth_form_image_wrapper}`}>
                    <figure className="">
                      <img
                        className={`${styles.auth_form_image}`}
                        src={logo}
                        alt="Shoppy Logo"
                      />
                    </figure>
                  </div>
                  <div className="form-body">
                    {error && <DisplayError message={error} />}
                    <div className="field mt-2">
                      <label htmlFor="email">Email</label>
                      <div className="control">
                        <input
                          type="email"
                          name="email"
                          id="userEmail"
                          className={`input ${styles.auth_form_input}`}
                          placeholder="Enter your email"
                          required
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="field mt-2">
                      <label htmlFor="password">Password</label>
                      <div className="control">
                        <input
                          type="password"
                          name="password"
                          id="userPassword"
                          className={`input ${styles.auth_form_input}`}
                          placeholder="Enter your password"
                          required
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="field mt-2 has-text-centered">
                      <button className="button is-info">
                        <span className="icon">
                          <i className="fab fa-facebook" />
                        </span>
                        <span>Sign in with Facebook</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="card-footer mt-2">
                <button
                  className={`card-footer-item heading-font has-background-primary ${
                    styles.auth_form_button
                  }`}
                  type="submit"
                >
                  Log In
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
