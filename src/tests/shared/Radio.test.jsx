import Radio from "../../components/shared/product/Radio";
import setup from "../setup";

const component = Radio;
const onClick = jest.fn();
const props = {
  attributes: [
    {
      attribute_value_id: 1,
      attribute_name: "a name",
      attribute_value: "some value"
    }
  ],
  onClick
};

describe("<Radio />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find(".column")).toHaveLength(1);
  });

  it("adds 'color-radio' class if isColor", () => {
    const newProps = { ...props, isColor: true };

    const { wrapper } = setup({
      component,
      props: newProps
    });

    expect(wrapper.find(".color-radio")).toHaveLength(1);
  });
});
