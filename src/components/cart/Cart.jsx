import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import { getCartItems } from "../../action/cart.action";
import Loader from "../shared/loader/Loader";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

export default function Cart() {
  const { state } = useContext(AuthContext);
  const { state: cartState } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cartId = cartState.cartId;

    const fetchCartItems = async () => {
      setIsLoading(true);
      const response = await getCartItems(cartId);

      setCartItems(response);
      setIsLoading(false);
    };

    fetchCartItems();
  }, [cartState.cartItems, cartState.cartId]);

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
              {isLoading ? (
                <div className="container">
                  <div className="columns is-centered is-vcentered is-mobile">
                    <Loader />
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
