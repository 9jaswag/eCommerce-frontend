import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import AuthUserItems from "../../components/shared/header/AuthUserItems";
import { AuthContext } from "../../components/context/auth.context";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("<AuthUserItems />", () => {
  it("should render without crashing", () => {
    const state = {};

    const { getByText } = render(
      <AuthContext.Provider value={{ state }}>
        <MemoryRouter>
          <AuthUserItems />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const welcomeText = getByText("Hi");
    expect(welcomeText).toHaveTextContent("Hi");

    const menuLink = getByText("My Bag");
    expect(menuLink).toHaveTextContent("My Bag");
  });

  it("should display current user's name", () => {
    const state = {};

    const { getByText } = render(
      <AuthContext.Provider value={{ state }}>
        <MemoryRouter>
          <AuthUserItems name="Dude" />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const username = getByText("Dude");
    expect(username).toHaveTextContent("Dude");
  });

  it("should remove localStorage tokens on logout", () => {
    const state = {};
    const dispatch = jest.fn();
    window.localStorage.setItem("accessToken", "accessToken");
    window.localStorage.setItem("cartId", "cartID");

    expect(window.localStorage.getItem("accessToken")).toBe("accessToken");
    expect(window.localStorage.getItem("cartId")).toBe("cartID");

    const { getByText } = render(
      <AuthContext.Provider value={{ state, dispatch }}>
        <MemoryRouter>
          <AuthUserItems name="Dude" />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutButton = getByText("Logout");

    fireEvent.click(logoutButton);

    expect(window.localStorage.getItem("accessToken")).toBe(null);
    expect(window.localStorage.getItem("cartId")).toBe(null);
  });
});
