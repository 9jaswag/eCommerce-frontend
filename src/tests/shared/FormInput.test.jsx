import FormInput from "../../components/shared/form/FormInput";
import setup from "../setup";

const component = FormInput;

describe("<FormInput />", () => {
  const props = { id: "test-form" };

  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find("#test-form")).toHaveLength(1);
  });

  it("displays a label text", () => {
    const props = { label: "Test form" };

    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.text()).toEqual("Test form ");
  });

  it("displays a required asterisk label if field is required", () => {
    const props = { required: true };

    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.text()).toEqual(" *");
  });

  it("displays a DisplayError component if error exists", () => {
    const props = { error: "Error exists" };

    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find("DisplayError")).toBeTruthy();
  });

  it("displays a help text if it exists", () => {
    const props = { helpText: "Password must be 6 chars and above" };

    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find(".help")).toHaveLength(1);
    expect(wrapper.text()).toEqual(" Password must be 6 chars and above");
  });
});
