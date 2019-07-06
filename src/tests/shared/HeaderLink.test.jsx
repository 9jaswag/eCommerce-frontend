import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import HeaderLink from "../../components/shared/header/HeaderLink";

afterEach(cleanup);

describe("<HeaderLink />", () => {
  it("should render without crashing", () => {
    const props = {
      path: "/search",
      value: "Search"
    };

    const { getByText } = render(
      <MemoryRouter>
        <HeaderLink {...props} />
      </MemoryRouter>
    );

    const button = getByText("Search");
    expect(button).toHaveTextContent("Search");
  });

  it("should add an active class if active", () => {
    const props = {
      path: "/search",
      value: "Search",
      isActive: true
    };

    const { container } = render(
      <MemoryRouter>
        <HeaderLink {...props} />
      </MemoryRouter>
    );

    const button = container.querySelector(".is-active");
    expect(button).toHaveTextContent("Search");
  });
});
