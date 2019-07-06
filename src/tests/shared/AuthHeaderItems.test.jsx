import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import AuthHeaderItems from "../../components/shared/header/AuthHeaderItems";
import { AuthContext } from "../../components/context/auth.context";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("<AuthHeaderItems />", () => {
  it("should render without crashing", () => {
    const state = {};

    const { getByText } = render(
      <AuthContext.Provider value={{ state }}>
        <MemoryRouter>
          <AuthHeaderItems />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const signupButton = getByText("Sign up");
    expect(signupButton).toHaveTextContent("Sign up");

    const loginButton = getByText("Log in");
    expect(loginButton).toHaveTextContent("Log in");
  });

  it("should open and close modal on page", () => {
    const state = {};

    const { getByText, container } = render(
      <AuthContext.Provider value={{ state }}>
        <MemoryRouter>
          <AuthHeaderItems name="Dude" />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const signupButton = getByText("Sign up");

    fireEvent.click(signupButton);

    const modal = container.querySelector(".modal.signup");
    expect(modal.className.includes("is-active")).toBe(true);

    const modalCloseButton = container.querySelector(".modal-close");

    fireEvent.click(modalCloseButton);

    expect(modal.className.includes("is-active")).toBe(false);
  });
});
