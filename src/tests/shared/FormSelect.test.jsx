import FormSelect from "../../components/shared/form/FormSelect";
import setup from "../setup";

const component = FormSelect;
const props = {
  options: [
    {
      shipping_region_id: 1,
      shipping_region: "Europe"
    }
  ]
};

describe("<FormSelect />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find(".control")).toHaveLength(1);
    expect(wrapper.text()).toEqual(" Europe");
  });

  it("displays a label text", () => {
    const newProps = { ...props, label: "Test form " };

    const { wrapper } = setup({
      component,
      props: newProps
    });

    expect(wrapper.text()).toEqual("Test form  Europe");
  });

  it("displays a required asterisk label if field is required", () => {
    const newProps = { ...props, required: true };

    const { wrapper } = setup({
      component,
      props: newProps
    });

    expect(wrapper.text()).toEqual(" *Europe");
  });
});
