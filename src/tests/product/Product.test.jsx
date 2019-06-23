import Product from "../../components/product/Product";
import setup from "../setup";

const component = Product;
const props = {
  match: { params: { id: 1 } }
};

describe("<Product />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find("ProductImage")).toBeTruthy();
    expect(wrapper.find("ProductReviews")).toBeTruthy();
    expect(wrapper.find("ProductReview")).toBeTruthy();
    expect(wrapper.find("ProductReviews")).toBeTruthy();
  });
});
