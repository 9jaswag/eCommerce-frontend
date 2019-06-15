import React, { useState, useContext } from "react";
import logo from "../../../assets/images/shoppy.png";
import styles from "./header.module.scss";
import DisplayError from "../../shared/error/DisplayError";
import { register } from "../../../action/auth.action";
import { actions, AuthContext } from "../../context/auth.context";

export default function RegistrationForm() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const onChange = event => {
    const {
      target: { name, value }
    } = event;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const setUserData = data => {
    dispatch(actions.SET_USER(data.customer));
    window.localStorage.setItem("accessToken", data.accessToken);
    dispatch(actions.SET_TOKEN(data.accessToken));
    dispatch(actions.SET_AUTHENTICATION(true));
  };

  const onSubmit = async event => {
    event.preventDefault();
    setError(null);

    const { name, email, password } = userDetails;

    if (
      name.trim().length < 1 ||
      email.trim().length < 1 ||
      password.trim().length < 6
    ) {
      setError("fill all fields appropriately");
      return;
    }

    const payload = { name, email, password };

    try {
      const response = await register(payload);

      // redrirect to homepage
      // console.log(response);
      setUserData(response);
    } catch (error) {
      setError(error.message);
    }
  };

  // console.log(state);
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
                      <label htmlFor="name">Name</label>
                      <div className="control">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={userDetails.name}
                          className={`input ${styles.auth_form_input}`}
                          placeholder="Enter your name"
                          required
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="field mt-2">
                      <label htmlFor="email">Email</label>
                      <div className="control">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={userDetails.email}
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
                          id="password"
                          value={userDetails.password}
                          className={`input ${styles.auth_form_input}`}
                          placeholder="Enter your password"
                          required
                          onChange={onChange}
                        />
                        <p className="help is-info has-text-weight-semibold">
                          Minimum of six characters
                        </p>
                      </div>
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
                  Sign Up
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
