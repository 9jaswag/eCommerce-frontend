import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Department from "../../components/product/Department";

afterEach(cleanup);

describe("<Department />", () => {
  it("should render without crashing", () => {
    const props = {
      match: { params: { id: 1 }, path: "/search" },
      location: { search: "?q=irish" }
    };

    const { getByText } = render(<Department {...props} />);

    const text = getByText("Categories");
    expect(text).toHaveTextContent("Categories");
  });
});
