import * as actions from "../../action/product.action";

describe("Customer actions", () => {
  const realFetch = global.fetch;

  afterEach(() => {
    global.fetch = realFetch;
  });

  describe("get product category action", () => {
    it("should return a user's detail", async () => {
      const mockSuccessResponse = {
        category_id: 1,
        name: "French",
        description:
          "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!",
        department_id: 1
      };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.getCategory(1);

      expect(response.name).toBe("French");
    });
  });

  describe("get product department action", () => {
    it("should return a user's detail", async () => {
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

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.getDepartment(1);

      expect(response.name).toBe("Regional");
    });
  });

  describe("add product review action", () => {
    it("should return true if request is successful", async () => {
      const mockSuccessResponse = true;

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const payload = {
        review: "some review",
        rating: 1,
        product_id: 1
      };

      const response = await actions.addReview(payload);

      expect(response).toBe(true);
    });

    it("should return false if request is unsuccessful", async () => {
      const mockSuccessResponse = false;

      const fetchResponse = {
        ok: false,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const payload = {
        review: "some review",
        rating: 1,
        product_id: 1
      };

      const response = await actions.addReview(payload);

      expect(response).toBe(false);
    });
  });
});
