import Department from "../../components/product/Department";
import setup from "../setup";

const component = Department;
const props = {
  match: { params: { id: 1 } }
};

describe("<Department />", () => {
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
