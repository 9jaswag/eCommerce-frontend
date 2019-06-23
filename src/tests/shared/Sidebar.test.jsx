import Sidebar from "../../components/shared/sidebar/Sidebar";
import setup from "../setup";

const component = Sidebar;

describe("<Sidebar />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component
    });

    expect(wrapper.find(".menu")).toHaveLength(1);
    expect(wrapper.find("Loader")).toBeTruthy();
  });
});
