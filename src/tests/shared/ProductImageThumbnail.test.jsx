import ProductImageThumbnail from "../../components/shared/product/ProductImageThumbnail";
import setup from "../setup";

const component = ProductImageThumbnail;

describe("<ProductImageThumbnail />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component
    });

    expect(wrapper.find(".image")).toHaveLength(1);
  });
});
