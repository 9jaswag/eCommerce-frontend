import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import CartItem from "../../components/cart/CartItem";
import { CartContext } from "../../components/context/cart.context";

afterEach(cleanup);

describe("<CartItem />", () => {
  it("should render without crashing", () => {
    const cartState = {
      cartId: "xyz",
      cartItems: [
        {
          item_id: 1,
          item: "some item"
        }
      ]
    };

    const props = {
      item: {
        item_id: 1,
        quantity: 2,
        name: "Some item",
        image: "image.jpg",
        attributes: "L, Red"
      }
    };

    const { getByText } = render(
      <CartContext.Provider value={{ state: cartState }}>
        <CartItem {...props} />
      </CartContext.Provider>
    );

    const text = getByText("Some item");
    expect(text).toHaveTextContent("Some item");
  });

  it("should show item update button and update quantity", () => {
    const cartState = {
      cartId: "xyz",
      cartItems: [
        {
          item_id: 1,
          item: "some item"
        }
      ]
    };

    const props = {
      item: {
        item_id: 1,
        quantity: 2,
        name: "Some item",
        image: "image.jpg",
        attributes: "L, Red"
      }
    };

    const { container } = render(
      <CartContext.Provider value={{ state: cartState }}>
        <CartItem {...props} />
      </CartContext.Provider>
    );

    expect(container.querySelector(".tags")).toBe(null);

    const button = container.querySelector(".fa-caret-up");

    fireEvent.click(button);

    const updateButton = container.querySelector(".tags");
    expect(updateButton).not.toBe(null);

    fireEvent.click(updateButton);
    // response
  });

  it("should remove item from cart", () => {
    const cartState = {
      cartId: "xyz",
      cartItems: [
        {
          item_id: 1,
          item: "some item"
        }
      ]
    };

    const props = {
      item: {
        item_id: 1,
        quantity: 2,
        name: "Some item",
        image: "image.jpg",
        attributes: "L, Red"
      }
    };

    const { container } = render(
      <CartContext.Provider value={{ state: cartState }}>
        <CartItem {...props} />
      </CartContext.Provider>
    );

    const button = container.querySelector(".button.is-danger");
    expect(button).toHaveTextContent("Remove from cart");

    fireEvent.click(button);
    // response
  });
});
