import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import AuthWrapper from "../../components/shared/wrapper/AuthWrapper";
import Home from "../../components/home/Home";
import { AuthContext } from "../../components/context/auth.context";

afterEach(cleanup);

describe("<AuthWrapper />", () => {
  it("should render without crashing", () => {
    const state = {
      // user: { name: "Dude" },
      isAuthenticated: true,
      accessToken: "eeee"
    };

    const props = {
      component: Home,
      type: "guest"
    };

    const dispatch = jest.fn();

    const { getByText } = render(
      <AuthContext.Provider value={{ state, dispatch }}>
        <AuthWrapper {...props} />
      </AuthContext.Provider>
    );

    const text = getByText("Loading...");
    expect(text).toHaveTextContent("Loading...");
  });
});
