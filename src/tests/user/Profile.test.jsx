import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Profile from "../../components/user/Profile";
import { AuthContext } from "../../components/context/auth.context";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("<Profile />", () => {
  it("should render without crashing", () => {
    const state = {
      user: { name: "Dude" }
    };

    const { getByText } = render(
      <AuthContext.Provider value={{ state }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const text = getByText("Account Overview");
    expect(text).toHaveTextContent("Account Overview");
  });
});
