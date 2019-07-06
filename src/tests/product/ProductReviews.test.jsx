import React from "react";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import ProductReviews from "../../components/product/ProductReviews";

afterEach(cleanup);

describe("<ProductReviews />", () => {
  it("should render without crashing", () => {
    const props = {
      review: {
        rating: 4,
        review: "Some review",
        created_on: Date.now(),
        name: "Dude"
      }
    };

    const { getByText } = render(<ProductReviews {...props} />);

    const text = getByText("Some review");
    expect(text).toHaveTextContent("Some review");
  });

  it("should render 5 empty stars if rating is 0", () => {
    const props = {
      review: {
        rating: 0,
        review: "Some review",
        created_on: Date.now(),
        name: "Dude"
      }
    };

    const { container } = render(<ProductReviews {...props} />);

    const stars = container.querySelectorAll(".far.fa-star");
    expect(stars.length).toBe(5);
  });

  it("should render 5 full stars if rating is more than 5", () => {
    const props = {
      review: {
        rating: 10,
        review: "Some review",
        created_on: Date.now(),
        name: "Dude"
      }
    };

    const { container } = render(<ProductReviews {...props} />);

    const stars = container.querySelectorAll(".fas.fa-star");
    expect(stars.length).toBe(5);
  });
});
