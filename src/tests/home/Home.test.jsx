import Home from "../../components/home/Home";
import setup from "../setup";

const component = Home;

describe("<Home />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component
    });

    expect(wrapper.find(".section")).toHaveLength(1);
    expect(wrapper.find("Sidebar")).toBeTruthy();
    expect(wrapper.find("ProductDisplay")).toBeTruthy();
  });
});
