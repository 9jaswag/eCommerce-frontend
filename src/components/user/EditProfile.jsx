import React, { useState, useEffect, useContext } from "react";
import CreditCardInput from "react-credit-card-input";
import { toast } from "react-toastify";
import FormInput from "../shared/form/FormInput";
import FormSelect from "../shared/form/FormSelect";
import { actions, AuthContext } from "../context/auth.context";
import { profileStatus } from "../../helpers/profileStatus";
import {
  updateProfile,
  updateAddress,
  updateCreditCard,
  getRegions
} from "../../action/customer.action";

export default function EditProfile(props) {
  const [regions, setRegions] = useState(null);
  const [cardError, setCardError] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    name: state.user.name,
    email: state.user.email,
    password: "",
    day_phone: state.user.day_phone,
    eve_phone: state.user.eve_phone,
    mob_phone: state.user.mob_phone,
    address_1: state.user.address_1,
    address_2: state.user.address_2,
    city: state.user.city,
    region: state.user.region,
    postal_code: state.user.postal_code,
    country: state.user.country,
    credit_card: state.user.credit_card,
    shipping_region_id: state.user.shipping_region_id
  });

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getRegions();
        setRegions(response);
      } catch (error) {}
    };

    fetchRegions();
  }, []);

  const onChange = event => {
    const {
      target: { name, value }
    } = event;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const onCcChange = event => {
    setUserDetails({ ...userDetails, credit_card: event.target.value });
  };

  const onSelectChange = event => {
    const {
      target: { value }
    } = event;

    const region = regions.find(
      region => region.shipping_region_id === parseInt(value, 10)
    );
    setUserDetails({
      ...userDetails,
      region: region.shipping_region,
      shipping_region_id: region.shipping_region_id
    });
  };

  const validateInput = input => {
    setCardError(false);

    if (input.password && input.password.length < 6) {
      toast.error("Please fill all required fields appropriately.");
      return false;
    }

    if (input.shipping_region_id === 1) {
      toast.error("Please fill all required fields appropriately.");
      return false;
    }

    if (input.credit_card.trim().length === 0) {
      toast.error("Please fill all required fields appropriately.");
      return false;
    }

    if (!profileStatus(userDetails)) {
      toast.error("Please fill all required fields appropriately.");
      return false;
    }

    if (cardError) {
      toast.error("Card is invalid");
      return false;
    }

    return true;
  };

  const onSubmit = async event => {
    event.preventDefault();
    setisSubmitting(true);

    const valid = validateInput(userDetails);
    if (!valid) return;

    try {
      await updateProfile(userDetails);
      await updateAddress(userDetails);
      const creditCardResponse = await updateCreditCard(userDetails);

      dispatch(actions.SET_TOKEN(creditCardResponse));
      setisSubmitting(false);

      toast.success("Profile updated successfully!", {
        onClose: () => (window.location.href = "/profile")
      });
    } catch (error) {
      const errorResponse = await error;
      setisSubmitting(false);

      toast.error("Profile update failed. Please retry!");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="column has-background-white is-8 is-offset-2">
          {Object.entries(state.user).length > 0 && (
            <form className="" onSubmit={onSubmit}>
              <div className="field mt-2">
                <FormInput
                  label="Name"
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  onChange={onChange}
                  required={true}
                  value={userDetails.name}
                />
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field mt-1">
                    <FormInput
                      label="Email"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      onChange={onChange}
                      required={true}
                      value={userDetails.email}
                      disabled={true}
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="Password"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      onChange={onChange}
                      value={userDetails.password}
                      helpText="Minimum of six characters"
                    />
                  </div>
                </div>
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
                      value={userDetails.day_phone ? userDetails.day_phone : ""}
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
                      value={userDetails.eve_phone ? userDetails.eve_phone : ""}
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="Mobile Phone"
                      type="tel"
                      name="mob_phone"
                      id="mob_phone"
                      placeholder="Enter your mobile phone"
                      onChange={onChange}
                      value={userDetails.mob_phone ? userDetails.mob_phone : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field mt-1">
                    <FormInput
                      label="Address"
                      type="text"
                      name="address_1"
                      id="address_1"
                      placeholder="Enter your address"
                      onChange={onChange}
                      required={true}
                      value={userDetails.address_1 ? userDetails.address_1 : ""}
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="Address 2"
                      type="text"
                      name="address_2"
                      id="address_2"
                      placeholder="Enter a second address"
                      onChange={onChange}
                      value={userDetails.address_2 ? userDetails.address_2 : ""}
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
                      value={userDetails.city ? userDetails.city : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-body" />
              </div>
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field mt-1">
                    {regions && (
                      <FormSelect
                        name="region"
                        id="region"
                        label="Region"
                        options={regions}
                        required={true}
                        onChange={onSelectChange}
                        value={userDetails.shipping_region_id}
                      />
                    )}
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
                        userDetails.postal_code ? userDetails.postal_code : ""
                      }
                    />
                  </div>
                  <div className="field mt-1">
                    <FormInput
                      label="Country"
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Enter your country"
                      onChange={onChange}
                      required={true}
                      value={userDetails.country ? userDetails.country : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="field">
                <label htmlFor="credit-card">
                  Credit card <span className="has-text-danger">*</span>
                </label>
                <div className="control">
                  <CreditCardInput
                    cardNumberInputProps={{
                      value: userDetails.credit_card,
                      onChange: onCcChange,
                      onError: err => setCardError(true)
                    }}
                    fieldClassName="user-card-input"
                  />
                </div>
              </div>
              <div className="field">
                <div className="field mt-2">
                  <button
                    className={`button is-primary ${
                      isSubmitting ? "is-loading" : ""
                    }`}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Update Profile
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
