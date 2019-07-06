import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import Checkout from "../../components/cart/Checkout";
import { AuthContext } from "../../components/context/auth.context";
import { CartContext } from "../../components/context/cart.context";

afterEach(cleanup);

describe("<Checkout />", () => {
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

    window.Stripe = function() {};

    const { getByText } = render(
      <AuthContext.Provider value={{ state: authState }}>
        <CartContext.Provider value={{ state: cartState }}>
          <MemoryRouter>
            <Checkout />
          </MemoryRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    const text = getByText("Shipping Details");
    expect(text).toHaveTextContent("Shipping Details");
  });

  it("should show message if cart is empty", () => {
    const authState = {
      isAuthenticated: false,
      user: { name: "Dude" }
    };

    const cartState = {
      cartId: "xyz",
      cartItems: []
    };

    window.Stripe = function() {};

    const { getByText } = render(
      <AuthContext.Provider value={{ state: authState }}>
        <CartContext.Provider value={{ state: cartState }}>
          <MemoryRouter>
            <Checkout />
          </MemoryRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    const text = getByText("Nothing to see here");
    expect(text).toHaveTextContent("Nothing to see here");
  });

  // it("should show shipping details if user profile is complete", () => {
  //   const authState = {
  //     isAuthenticated: false,
  //     user: {
  //       name: "Dude",
  //       address_1: "Some address",
  //       city: "Some city",
  //       region: "Some region",
  //       postal_code: "123",
  //       country: "A country",
  //       credit_card: "4242 4242 4242 4242"
  //     }
  //   };

  //   const cartState = {
  //     cartId: "xyz",
  //     cartItems: [
  //       {
  //         item_id: 1,
  //         item: "some item"
  //       }
  //     ]
  //   };

  //   window.Stripe = function() {};

  //   const { getByText } = render(
  //     <AuthContext.Provider value={{ state: authState }}>
  //       <CartContext.Provider value={{ state: cartState }}>
  //         <MemoryRouter>
  //           <Checkout />
  //         </MemoryRouter>
  //       </CartContext.Provider>
  //     </AuthContext.Provider>
  //   );

  //   const text = getByText("Nothing to see here");
  //   expect(text).toHaveTextContent("Nothing to see here");
  // });
});
