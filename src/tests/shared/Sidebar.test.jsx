import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import { CartContext } from "../../components/context/cart.context";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("<Sidebar />", () => {
  it("should render without crashing", () => {
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
          <Sidebar />
        </MemoryRouter>
      </CartContext.Provider>
    );

    const text = getByText("Categories");
    expect(text).toHaveTextContent("Categories");

    // const toggle = text.firstElementChild;
    // fireEvent.click(toggle);
    // console.log(toggle.className);
  });
});
