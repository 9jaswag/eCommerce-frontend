import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import GroupHero from "../../components/product/GroupHero";

afterEach(cleanup);

describe("<GroupHero />", () => {
  it("should render without crashing", () => {
    const props = {
      name: "Region",
      description: "Some text"
    };

    const { getByText } = render(<GroupHero {...props} />);

    const text = getByText("Region Wears");
    expect(text).toHaveTextContent("Region Wears");
  });
});
