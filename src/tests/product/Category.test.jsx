import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Category from "../../components/product/Category";

afterEach(cleanup);

describe("<Category />", () => {
  it("should render without crashing", () => {
    const props = {
      match: { params: { id: 1 }, path: "/search" },
      location: { search: "?q=irish" }
    };

    const { getByText } = render(<Category {...props} />);

    const text = getByText("Categories");
    expect(text).toHaveTextContent("Categories");
  });
});
