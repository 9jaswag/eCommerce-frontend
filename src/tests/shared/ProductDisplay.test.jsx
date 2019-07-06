import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
// import { act } from "react-test-renderer";
import { act } from "react-dom/test-utils";
import ProductDisplay from "../../components/shared/product/ProductDisplay";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("<ProductDisplay />", () => {
  it("should render without crashing", async () => {
    const props = {
      match: { params: { id: 1 }, path: "/search" },
      location: { search: "?q=irish" }
    };

    const { getByText } = render(
      <MemoryRouter>
        <ProductDisplay {...props} />
      </MemoryRouter>
    );

    // const text = getByText("Hello");

    // console.log(text);
  });
});
