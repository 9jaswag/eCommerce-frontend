import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import ProductImage from "../../components/product/ProductImage";

afterEach(cleanup);

describe("<ProductImage />", () => {
  it("should render without crashing", () => {
    const props = {
      product: { image: "src.jpg", name: "A product", image_2: "src2.jpg" }
    };

    const { container } = render(<ProductImage {...props} />);

    const thumbnail = container.querySelectorAll(
      "img[alt='A product thumbnail']"
    )[2];

    thumbnail.click();

    expect(thumbnail.src).toBe(
      "https://backendapi.turing.com/images/products/src2.jpg"
    );
  });
});
