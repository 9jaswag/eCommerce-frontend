import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Header from "../../components/shared/header/Header";
import { AuthContext } from "../../components/context/auth.context";
import { CartContext } from "../../components/context/cart.context";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("<Header />", () => {
  it("should render without crashing", () => {
    const state = {
      user: { name: "Dude" }
    };

    const cartState = {
      cartId: "1",
      cartItems: []
    };

    const { getByText } = render(
      <AuthContext.Provider value={{ state }}>
        <CartContext.Provider value={{ state: cartState }}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    const signupButton = getByText("Sign up");
    expect(signupButton).toHaveTextContent("Sign up");

    const loginButton = getByText("Log In");
    expect(loginButton).toHaveTextContent("Log In");
  });

  it("should display current user's name", () => {
    const state = {
      user: { name: "Dude" },
      isAuthenticated: true
    };

    const cartState = {
      cartId: "1",
      cartItems: []
    };

    const props = {
      location: { pathname: "/department/1" }
    };

    const { getByText } = render(
      <AuthContext.Provider value={{ state }}>
        <CartContext.Provider value={{ state: cartState }}>
          <MemoryRouter>
            <Header {...props} />
          </MemoryRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    const username = getByText("Dude");
    expect(username).toHaveTextContent("Dude");
  });

  it("should toggle mobile menu", () => {
    const state = {
      user: { name: "Dude" },
      isAuthenticated: true
    };

    const cartState = {
      cartId: "1",
      cartItems: []
    };

    const props = {
      location: { pathname: "/department/1" }
    };

    const { container } = render(
      <AuthContext.Provider value={{ state }}>
        <CartContext.Provider value={{ state: cartState }}>
          <MemoryRouter>
            <Header {...props} />
          </MemoryRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    const button = container.querySelector(".navbar-burger");
    fireEvent.click(button);

    const burger = container.querySelector(".burger");

    expect(burger.className.includes("is-active")).toBe(true);
  });

  it("should update the search", () => {
    const state = {
      user: { name: "Dude" },
      isAuthenticated: true
    };

    const cartState = {
      cartId: "1",
      cartItems: []
    };

    const props = {
      location: { pathname: "/department/1" }
    };

    const { container } = render(
      <AuthContext.Provider value={{ state }}>
        <CartContext.Provider value={{ state: cartState }}>
          <MemoryRouter>
            <Header {...props} />
          </MemoryRouter>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

    const input = container.querySelector(".input");

    fireEvent.change(input, { target: { value: "irish" } });
    expect(input.value).toBe("irish");
  });
});
