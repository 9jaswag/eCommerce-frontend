import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Category from "../../components/product/Category";
import { CartContext } from "../../components/context/cart.context";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("<Category />", () => {
  it("should render without crashing", () => {
    const props = {
      match: { params: { id: 1 }, path: "/search" },
      location: { search: "?q=irish" }
    };

    const state = {
      cartId: "xyz",
      cartItems: [
        {
          item_id: 1,
          item: "some item"
        }
      ],
      categories: [
        {
          category_id: 1,
          name: "French",
          description: "The French have always had an eye for beauty.",
          department_id: 1
        }
      ]
    };

    const { getByText } = render(
      <CartContext.Provider value={{ state }}>
        <MemoryRouter>
          <Category {...props} />
        </MemoryRouter>
      </CartContext.Provider>
    );

    const text = getByText("Categories");
    expect(text).toHaveTextContent("Categories");
  });
});
