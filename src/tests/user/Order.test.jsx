import Order from "../../components/user/Order";
import setup from "../setup";

const component = Order;
const props = {
  id: 1
};

describe("<Order />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find("div")).toHaveLength(1);
  });
});
