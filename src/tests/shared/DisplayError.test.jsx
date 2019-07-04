import DisplayError from "../../components/shared/error/DisplayError";
import setup from "../setup";

const component = DisplayError;

const props = { message: "Error exists" };

describe("<DisplayError />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find(".has-text-danger")).toHaveLength(1);
  });

  it("displays an error message", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.text()).toEqual("Error exists");
  });
});
