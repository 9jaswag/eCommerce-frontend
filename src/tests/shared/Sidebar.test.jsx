import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import { AuthContext } from "../../components/context/auth.context";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("<Sidebar />", () => {
  it("should render without crashing", () => {
    const state = {
      user: { name: "Dude" }
    };

    const { getByText } = render(
      <AuthContext.Provider value={{ state }}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const text = getByText("Categories");
    expect(text).toHaveTextContent("Categories");

    // const toggle = text.firstElementChild;
    // fireEvent.click(toggle);
    // console.log(toggle.className);
  });
});
