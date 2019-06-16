import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { actions, AuthContext } from "../context/auth.context";
import { actions as cartActions, CartContext } from "../context/cart.context";
import { getCartItems } from "../../action/cart.action";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

export default function Cart() {
  const { state, dispatch } = useContext(AuthContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartState.cartItems);
  }, [cartState.cartItems]);

  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="columns">
          <div className="column">
            <div className="section">
              <div className="">
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <p className="heading-font">
                        {state.isAuthenticated
                          ? `${state.user.name}'s Cart`
                          : "Your Cart"}
                      </p>
                    </div>
                  </div>
                  <div className="level-right">
                    <p className="level-item">
                      {state.isAuthenticated
                        ? cartItems.length > 0 && (
                            <Link to="/checkout" className="button is-success">
                              Checkout
                            </Link>
                          )
                        : cartItems.length > 0 && "Login to checkout"}
                    </p>
                  </div>
                </nav>
              </div>
              <div className="cart-items mt-2">
                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <CartItem
                      key={item.item_id}
                      item={item}
                      cartItems={setCartItems}
                    />
                  ))
                ) : (
                  <EmptyCart />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
