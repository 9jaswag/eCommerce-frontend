import React from "react";
import logo from "../../../assets/images/shoppy.png";
import styles from "./header.module.scss";

export default function RegistrationForm() {
  return (
    <div className="section">
      <div className="columns">
        <div className="column has-background-white is-8 is-offset-2">
          <div className="card">
            <form className="heading-font">
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
                  <div class="form-body">
                    <div className="field mt-2">
                      <label htmlFor="name">Name</label>
                      <div className="control">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className={`input ${styles.auth_form_input}`}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>
                    <div className="field mt-2">
                      <label htmlFor="email">Email</label>
                      <div className="control">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className={`input ${styles.auth_form_input}`}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="field mt-2">
                      <label htmlFor="password">Password</label>
                      <div className="control">
                        <input
                          type="text"
                          name="password"
                          id="password"
                          className={`input ${styles.auth_form_input}`}
                          placeholder="Enter your password"
                          required
                        />
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
                  Register
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
