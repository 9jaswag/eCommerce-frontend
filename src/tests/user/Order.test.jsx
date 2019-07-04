import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Order from "../../components/user/Order";

afterEach(cleanup);

describe("<Order />", () => {
  it("should load and display order component", () => {
    const { getByText } = render(<Order id={16937} />);
    // console.log(getByText("Orders"));
  });
});
