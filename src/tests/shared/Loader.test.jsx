import Loader from "../../components/shared/loader/Loader";
import setup from "../setup";

const component = Loader;

describe("<Loader />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component
    });

    expect(wrapper.find("svg")).toHaveLength(1);
  });
});
