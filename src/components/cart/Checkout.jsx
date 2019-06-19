import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { actions, AuthContext } from "../context/auth.context";
import { actions as cartActions, CartContext } from "../context/cart.context";
import { profileStatus } from "../../helpers/profileStatus";
import { getShippingOptions } from "../../action/customer.action";
import { getCartTotal } from "../../action/cart.action";
import image from "../../assets/images/stripe.png";

export default function Checkout(props) {
  const { state, dispatch } = useContext(AuthContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const [shippingMethods, setShippingMethods] = useState(null);
  const [shippingId, setShippingId] = useState(null);
  const [cartTotal, setCartTotal] = useState({
    sub_total: 0,
    shipping: 0
  });

  useEffect(() => {
    const fetchShippingMethod = async () => {
      try {
        const response = await getShippingOptions(
          state.user.shipping_region_id
        );
        setShippingMethods(response);
      } catch (error) {
        //handle error
      }
    };

    fetchShippingMethod();

    const fetchCartTotal = async () => {
      try {
        const response = await getCartTotal(cartState.cartId);

        setCartTotal(state => {
          return {
            sub_total: parseFloat(response.total_amount, 10),
            shipping: state.shipping
          };
        });
      } catch (error) {
        // handle error
      }
    };

    fetchCartTotal();
  }, [state.user.shipping_region_id, cartState.cartId]);

  const onChange = event => {
    const {
      target: { value }
    } = event;

    setShippingId(value);

    if (value) {
      const shippingCost = shippingMethods.find(
        method => parseInt(method.shipping_id, 10) === parseInt(value, 10)
      );

      setCartTotal({
        ...cartTotal,
        shipping: parseInt(shippingCost.shipping_cost, 10)
      });
    } else {
      setCartTotal({
        ...cartTotal,
        shipping: 0
      });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-8">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title heading is-size-5 ml-1">
                  Shipping Details
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  {profileStatus(state.user, true) ? (
                    <>
                      <div className="">
                        <span className="is-block body-font is-size-5 has-text-weight-semibold">
                          {state.user.name}
                        </span>
                        <span className="is-block body-font is-size-5">
                          {state.user.address_1}
                        </span>
                        <span className="is-block body-font is-size-5">
                          {state.user.address_2}
                        </span>
                        <span className="is-block body-font is-size-5">
                          {state.user.city}
                        </span>
                        <span className="is-block body-font is-size-5">
                          {state.user.country}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="mt-2">
                      <p className="mb-2 is-size-5">
                        Please update your shipping and billing information to
                        continue
                      </p>
                      <Link to="/edit-profile" className="button is-primary">
                        Update Info
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {profileStatus(state.user, true) && (
              <>
                <div className="mt-2">
                  <div className="card">
                    <header className="card-header">
                      <p className="card-header-title heading is-size-5 ml-1">
                        Shipping Method
                      </p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        {shippingMethods && (
                          <div className="control">
                            <label htmlFor="shipping-method">
                              Shipping Method
                            </label>
                            <br />
                            <div className="select mt-1">
                              <select
                                name="shipping-method"
                                id="shipping-method"
                                className=""
                                onChange={onChange}
                              >
                                <option value="">Select shipping method</option>
                                {shippingMethods.map(method => (
                                  <option
                                    key={method.shipping_id}
                                    value={method.shipping_id}
                                  >
                                    {method.shipping_type}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  {shippingId && (
                    <div className="card">
                      <header className="card-header">
                        <p className="card-header-title heading is-size-5 ml-1">
                          Payment
                        </p>
                      </header>
                      <div className="card-content">
                        <div className="content">
                          <div className="mb-2">
                            <p className="has-text-weight-semibold is-size-6">
                              Order Summary
                            </p>
                            <div className="subtotal">
                              <p className="">{`Subtotal: $${
                                cartTotal.sub_total
                              }`}</p>
                            </div>
                            <div className="shipping">
                              <p className="">{`Shipping: $${
                                cartTotal.shipping
                              }`}</p>
                            </div>
                            <div className="tax">
                              <p className="">Tax: $0</p>
                            </div>
                            <div className="total">
                              <hr />
                              <p className="has-text-weight-bold">{`Total: $${cartTotal.sub_total +
                                cartTotal.shipping}`}</p>
                            </div>
                          </div>
                          <figure className="image is-marginless w-20">
                            <img src={image} alt="pay with stripe" />
                          </figure>
                          <button className="button is-primary mt-2">
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="column">
            <div className="">
              <h3 className="">Cart Total</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
