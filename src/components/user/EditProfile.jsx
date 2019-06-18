import React, { useState, useContext } from "react";
import FormInput from "../shared/form/FormInput";
import { actions, AuthContext } from "../context/auth.context";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const { state, dispatch } = useContext(AuthContext);

  const onChange = event => {};
  console.log(state.user);

  return (
    <section className="section">
      <div className="container">
        <div className="column has-background-white is-8 is-offset-2">
          {Object.entries(state.user).length > 0 && (
            <form className="">
              <div className="field mt-2">
                <FormInput
                  label="Name"
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  onChange={onChange}
                  required={true}
                  value={state.user.name}
                />
              </div>
              <div className="field mt-2">
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={onChange}
                  required={true}
                  value={state.user.email}
                />
              </div>
              <div className="field mt-2">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={onChange}
                />
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field mt-1">
                    <FormInput
                      label="Day Phone"
                      type="tel"
                      name="day_phone"
                      id="day_phone"
                      placeholder="Enter your day phone"
                      onChange={onChange}
                      value={state.user.day_phone ? state.user.day_phone : ""}
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="Evening Phone"
                      type="tel"
                      name="eve_phone"
                      id="eve_phone"
                      placeholder="Enter your evening phone"
                      onChange={onChange}
                      value={state.user.eve_phone ? state.user.eve_phone : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field mt-1">
                    <FormInput
                      label="Mobile Phone"
                      type="tel"
                      name="mob_phone"
                      id="mob_phone"
                      placeholder="Enter your mobile phone"
                      onChange={onChange}
                      value={state.user.eve_phone ? state.user.eve_phone : ""}
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="Address"
                      type="text"
                      name="address_1"
                      id="address_1"
                      placeholder="Enter your address"
                      onChange={onChange}
                      required={true}
                      value={state.user.address_1 ? state.user.address_1 : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field mt-1">
                    <FormInput
                      label="Address 2"
                      type="text"
                      name="address_2"
                      id="address_2"
                      placeholder="Enter a second address"
                      onChange={onChange}
                      value={state.user.address_2 ? state.user.address_2 : ""}
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="City"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter your city"
                      onChange={onChange}
                      required={true}
                      value={state.user.city ? state.user.city : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field mt-1">
                    <FormInput
                      label="Region"
                      type="text"
                      name="region"
                      id="region"
                      placeholder="Enter your region"
                      onChange={onChange}
                      required={true}
                      value={state.user.region ? state.user.region : ""}
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="Postal Code"
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      placeholder="Enter your postal code"
                      onChange={onChange}
                      required={true}
                      value={
                        state.user.postal_code ? state.user.postal_code : ""
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field mt-1">
                    <FormInput
                      label="Country"
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Enter your country"
                      onChange={onChange}
                      required={true}
                      value={state.user.country ? state.user.country : ""}
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="Credit card"
                      type="text"
                      name="credit_card"
                      id="credit_card"
                      placeholder="Enter your credit card information"
                      onChange={onChange}
                      required={true}
                      value={
                        state.user.credit_card ? state.user.credit_card : ""
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="field mt-2">
                  <button className="button is-primary" type="submit">
                    Update
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
