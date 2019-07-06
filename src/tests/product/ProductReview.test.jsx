import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import ProductReview from "../../components/product/ProductReview";

afterEach(cleanup);

describe("<ProductReview />", () => {
  it("should render without crashing", () => {
    const setReviews = jest.fn();
    const props = {
      id: 1,
      setReviews,
      reviews: []
    };

    const { getByText } = render(<ProductReview {...props} />);

    const text = getByText("Submit");
    expect(text).toHaveTextContent("Submit");
  });

  it("should select a rating star", async () => {
    const setReviews = jest.fn();
    const props = {
      id: 1,
      setReviews,
      reviews: []
    };

    const { getByText, container } = render(<ProductReview {...props} />);

    const text = getByText("Submit");
    fireEvent.click(text);

    const star = container.querySelector("#star-5");
    expect(star.checked).toBe(false);

    fireEvent.click(star);

    expect(star.checked).toBe(true);
  });
});
