import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Cart from "../../components/cart/Cart";
import { AuthContext } from "../../components/context/auth.context";
import { CartContext } from "../../components/context/cart.context";

afterEach(cleanup);

describe("<Cart />", () => {
  it("should render without crashing", () => {
    const authState = {
      isAuthenticated: false,
      user: { name: "Dude" }
    };

    const cartState = {
      cartId: "xyz",
      cartItems: [
        {
          item_id: 1,
          item: "some item"
        }
      ]
    };

    const { getByText } = render(
      <AuthContext.Provider value={{ state: authState }}>
        <CartContext.Provider value={{ state: cartState }}>
          <Cart />
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    const text = getByText("Your Cart");
    expect(text).toHaveTextContent("Your Cart");
  });

  it("should display user's name", () => {
    const authState = {
      isAuthenticated: true,
      user: { name: "Dude" }
    };

    const cartState = {
      cartId: "xyz",
      cartItems: [
        {
          item_id: 1,
          item: "some item"
        }
      ]
    };

    const { getByText } = render(
      <AuthContext.Provider value={{ state: authState }}>
        <CartContext.Provider value={{ state: cartState }}>
          <Cart />
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    const text = getByText("Dude's Cart");
    expect(text).toHaveTextContent("Dude's Cart");
  });
});
