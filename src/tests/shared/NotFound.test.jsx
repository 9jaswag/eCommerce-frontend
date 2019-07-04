import NotFound from "../../components/shared/not_found/NotFound";
import setup from "../setup";

const component = NotFound;

describe("<NotFound />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component
    });

    expect(wrapper.find(".hero")).toHaveLength(1);
    expect(wrapper.text()).toEqual(
      "It's lonely out hereHere's the way <Link />"
    );
  });
});
