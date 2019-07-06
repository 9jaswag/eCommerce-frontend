import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Product from "../../components/product/Product";

afterEach(cleanup);

describe("<Product />", () => {
  it("should render without crashing", () => {
    const props = {
      match: { params: { id: 1 }, path: "/search" }
    };

    const { getByText } = render(<Product {...props} />);

    // response
  });
});
