import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import QuantityToggle from "../../components/shared/product/QuantityToggle";

afterEach(cleanup);

describe("<QuantityToggle />", () => {
  it("should render without crashing", () => {
    const setQuantity = jest.fn();

    const { container } = render(
      <QuantityToggle quantity={5} setQuantity={setQuantity} />
    );

    const text = container.querySelector("#quantity");
    expect(text.value).toBe("5");

    const toggleLess = container.querySelectorAll(".button")[0];
    const toggleMore = container.querySelectorAll(".button")[2];

    fireEvent.click(toggleLess);

    expect(setQuantity).toHaveBeenCalledTimes(1);

    fireEvent.click(toggleMore);

    expect(setQuantity).toHaveBeenCalledTimes(2);

    fireEvent.change(text, { target: { value: "8" } });

    expect(setQuantity).toHaveBeenCalledTimes(3);
  });
});
