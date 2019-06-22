import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { profileStatus } from "../../helpers/profileStatus";
import { getOrders } from "../../action/customer.action";
import Order from "./Order";

export default function Profile() {
  const { state } = useContext(AuthContext);
  const { user } = state;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();

      setOrders(response);
    };

    fetchOrders();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="heading">
          <h2 className="has-font-weight-bold is-size-4 mb-2">
            Account Overview
          </h2>
        </div>
        <div className="columns is-multiline">
          <div className="column is-flex">
            <div className="section has-background-light w-100">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">Account Details</p>
                  <Link
                    to="/edit-profile"
                    className="card-header-icon"
                    aria-label="more options"
                  >
                    <span className="icon">
                      <i className="far fa-edit" aria-hidden="true" />
                    </span>
                  </Link>
                </header>
                <div className="card-content">
                  <div className="content">
                    <h4 className="">{user.name}</h4>
                    <p className="">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-flex">
            <div className="section has-background-light w-100">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">Address Book</p>
                  <Link
                    to="/edit-profile"
                    className="card-header-icon"
                    aria-label="more options"
                  >
                    <span className="icon">
                      <i className="far fa-edit" aria-hidden="true" />
                    </span>
                  </Link>
                </header>
                <div className="card-content">
                  <div className="content">
                    {profileStatus(user) ? (
                      <>
                        <h6 className="">Your default shipping address:</h6>
                        <span className="is-block body-font">{user.name}</span>
                        <span className="is-block body-font">
                          {user.address_1}
                        </span>
                        <span className="is-block body-font">
                          {user.address_2}
                        </span>
                        <span className="is-block body-font">{user.city}</span>
                        <span className="is-block body-font">
                          {user.country}
                        </span>
                      </>
                    ) : (
                      "Please update your shipping and billing information"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="heading mt-2">
          <h2 className="has-font-weight-bold is-size-4 my-2">Orders</h2>
        </div>
        <div className="columns is-multiline">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.order_id} className="column is-12">
                <div className="section has-background-light">
                  <Order id={order.order_id} />
                </div>
              </div>
            ))
          ) : (
            <div className="columns">
              <div className="column">
                <h3 className="">You have not made any order so far.</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
