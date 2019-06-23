import Category from "../../components/product/Category";
import setup from "../setup";

const component = Category;
const props = {
  match: { params: { id: 1 } }
};

describe("<Category />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find("section")).toHaveLength(1);
    expect(wrapper.find("Sidebar")).toBeTruthy();
    expect(wrapper.find("ProductDisplay")).toBeTruthy();
  });
});
