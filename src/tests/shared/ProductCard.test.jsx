import ProductCard from "../../components/shared/product/ProductCard";
import setup from "../setup";

const component = ProductCard;

describe("<ProductCard />", () => {
  const props = { product: { price: 15, discounted_price: 10 } };

  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find(".column")).toHaveLength(1);
  });
});
