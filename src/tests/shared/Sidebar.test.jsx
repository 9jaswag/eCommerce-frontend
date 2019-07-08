import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
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

    const { getByText, container } = render(
      <CartContext.Provider value={{ state }}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </CartContext.Provider>
    );

    const text = getByText("Categories");
    expect(text).toHaveTextContent("Categories");

    expect(
      container
        .querySelector(".menu-list.category-menu")
        .className.includes("is-hidden-mobile")
    ).toBe(true);
    const toggle = container.querySelector(".icon.is-large.is-hidden-tablet");
    fireEvent.click(toggle);

    const menu = container.querySelector(".menu-list.category-menu");
    expect(menu.className.includes("is-hidden-mobile")).not.toBe(true);
  });
});
