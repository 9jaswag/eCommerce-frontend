import ProductDisplayModal from "../../components/shared/product/ProductDisplayModal";
import setup from "../setup";

const component = ProductDisplayModal;

describe("<ProductDisplayModal />", () => {
  const props = { src: "fancy_url" };

  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find(".modal")).toHaveLength(1);
  });
});
