import Home from "../../components/home/Home";
import setup from "../setup";

const component = Home;

describe("<Home />", () => {
  it("renders without crashing", async () => {
    const { wrapper } = setup({
      component
    });

    const mockSuccessResponse = {
      department_id: 1,
      name: "Regional",
      description:
        "Proud of your country? Wear a T-shirt with a national symbol stamp!"
    };

    const fetchResponse = {
      ok: true,
      json: () => mockSuccessResponse
    };

    const fetch = jest.fn(() => new Promise(resolve => resolve(fetchResponse)));

    global.fetch = fetch;

    expect(wrapper.find(".section")).toHaveLength(1);
    expect(wrapper.find("Sidebar")).toBeTruthy();
    expect(wrapper.find("ProductDisplay")).toBeTruthy();
  });
});
