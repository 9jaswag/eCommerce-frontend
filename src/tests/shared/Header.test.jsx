import Header from "../../components/shared/header/Header";
import setup from "../setup";

const component = Header;

describe("<Header />", () => {
  it("renders without crashing", () => {
    const { wrapper } = setup({
      component
    });

    expect(wrapper.find("HeaderLink")).toBeTruthy();
    expect(wrapper.find("AuthUserItems")).toBeTruthy();
    expect(wrapper.find("AuthHeaderItems")).toBeTruthy();
  });
});
