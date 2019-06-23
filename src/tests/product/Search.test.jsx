import Search from "../../components/product/Search";
import setup from "../setup";

const component = Search;
const props = {
  location: { search: "?q=irish" }
};

describe("<Search />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component,
      props
    });

    expect(wrapper.find(".section")).toHaveLength(1);
    expect(wrapper.find("ProductDisplay")).toBeTruthy();
    expect(wrapper.text()).toEqual("Search for irish:<ProductDisplay />");
  });
});
