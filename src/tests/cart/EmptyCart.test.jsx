import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import EmptyCart from "../../components/cart/EmptyCart";

afterEach(cleanup);

describe("<EmptyCart />", () => {
  it("should render without crashing", () => {
    const { container } = render(<EmptyCart />);

    const image = container.querySelector("img");
    expect(image).not.toBe(null);
  });
});
