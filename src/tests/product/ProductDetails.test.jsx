import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import ProductDetails from "../../components/product/ProductDetails";

afterEach(cleanup);

describe("<ProductDetails />", () => {
  it("should render without crashing", () => {
    const props = {
      product: {
        name: "Some product",
        description: "Some product description",
        price: "50",
        discounted_price: "30",
        product_id: 1
      },
      color: [
        {
          attribute_value_id: 1,
          attribute_name: "Red",
          attribute_value: "red"
        }
      ],
      size: [
        {
          attribute_value_id: 1,
          attribute_name: "XL",
          attribute_value: "xl"
        }
      ]
    };

    const { getByText } = render(<ProductDetails {...props} />);

    const text = getByText("Some product");
    expect(text).toHaveTextContent("Some product");
  });

  it("should display errors on submit", () => {
    const props = {
      product: {
        name: "Some product",
        description: "Some product description",
        price: "50",
        discounted_price: "30",
        product_id: 1
      },
      color: [
        {
          attribute_value_id: 1,
          attribute_name: "Color",
          attribute_value: "red"
        }
      ],
      size: [
        {
          attribute_value_id: 1,
          attribute_name: "Size",
          attribute_value: "xl"
        }
      ]
    };

    const { getByText, container } = render(<ProductDetails {...props} />);

    const submitButton = getByText("Add to cart");

    const quantity = container.querySelector("#quantity");

    fireEvent.change(quantity, { target: { value: "0" } });

    fireEvent.click(submitButton);

    const sizeError = getByText("Please select at a size");
    const colorError = getByText("Please select at a color");
    const quantityError = getByText("Please select at least one quantity");

    expect(sizeError).toHaveTextContent("Please select at a size");
    expect(colorError).toHaveTextContent("Please select at a color");
    expect(quantityError).toHaveTextContent(
      "Please select at least one quantity"
    );
  });

  it("should display errors on submit", () => {
    const props = {
      product: {
        name: "Some product",
        description: "Some product description",
        price: "50",
        discounted_price: "30",
        product_id: 1
      },
      color: [
        {
          attribute_value_id: 1,
          attribute_name: "Color",
          attribute_value: "Red"
        }
      ],
      size: [
        {
          attribute_value_id: 1,
          attribute_name: "Size",
          attribute_value: "XL"
        }
      ]
    };

    const { getByText } = render(<ProductDetails {...props} />);

    const submitButton = getByText("Add to cart");

    const color = getByText("Red");
    const size = getByText("XL");
    color.firstElementChild.click();
    size.firstElementChild.click();

    fireEvent.click(submitButton);
    //   response
  });
});
