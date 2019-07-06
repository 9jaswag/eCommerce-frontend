import * as actions from "../../action/cart.action";

describe("Cart actions", () => {
  const realFetch = global.fetch;

  afterEach(() => {
    global.fetch = realFetch;
  });

  describe("create cart action", () => {
    it("should return a user token", async () => {
      const mockSuccessResponse = {
        cart_id: "mu1js99v9n1"
      };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.createCart();

      expect(response.cart_id).toBe("mu1js99v9n1");
    });
  });

  describe("add to cart action", () => {
    it("should return a cart item", async () => {
      const mockSuccessResponse = {
        item_id: 2,
        name: "Arc d'Triomphe",
        attributes: "LG, red",
        product_id: 2,
        price: "14.99",
        quantity: 1,
        image: "arc-d-triomphe.gif",
        subtotal: "14.99"
      };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.addToCart();

      expect(response.name).toBe("Arc d'Triomphe");
    });
  });

  describe("get cart items action", () => {
    it("should return cart items", async () => {
      const mockSuccessResponse = {
        item_id: 2,
        name: "Arc d'Triomphe",
        attributes: "LG, red",
        product_id: 2,
        price: "14.99",
        quantity: 1,
        image: "arc-d-triomphe.gif",
        subtotal: "14.99"
      };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.getCartItems(1);

      expect(response.name).toBe("Arc d'Triomphe");
    });
  });

  describe("update cart items action", () => {
    it("should return an updated cart item", async () => {
      const mockSuccessResponse = {
        item_id: 2,
        name: "Arc d'Triomphe",
        attributes: "LG, red",
        product_id: 2,
        price: "14.99",
        quantity: 3,
        image: "arc-d-triomphe.gif",
        subtotal: "14.99"
      };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const payload = {
        itemId: 2,
        quantity: 3
      };

      const response = await actions.updateCartItem(payload);

      expect(response.quantity).toBe(3);
    });
  });

  describe("delete cart items action", () => {
    it("should return true if response is successful", async () => {
      const mockSuccessResponse = true;

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.deleteCartItem(1);

      expect(response).toBe(true);
    });

    it("should return false if response is unsuccessful", async () => {
      const mockSuccessResponse = false;

      const fetchResponse = {
        ok: false,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.deleteCartItem(1);

      expect(response).toBe(false);
    });
  });

  describe("get cart total action", () => {
    it("should return a total amount if response is successful", async () => {
      const mockSuccessResponse = { total_amount: 5 };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.getCartTotal(1);

      expect(response.total_amount).toBe(5);
    });

    it("should return error if response is unsuccessful", async () => {
      const mockSuccessResponse = { message: "The field example is empty." };

      const fetchResponse = {
        ok: false,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      let errorResponse;

      try {
        await actions.getCartTotal(1);
      } catch (error) {
        errorResponse = error;
      }

      expect(errorResponse.message).toBe("The field example is empty.");
    });
  });

  describe("create order action", () => {
    it("should return an order id response is successful", async () => {
      const mockSuccessResponse = { orderId: 1 };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const payload = {};

      const response = await actions.createOrder(payload);
      expect(response.orderId).toBe(1);
    });

    it("should return error if response is unsuccessful", async () => {
      const mockSuccessResponse = { message: "The field example is empty." };

      const fetchResponse = {
        ok: false,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const payload = {};
      let errorResponse;

      try {
        await actions.createOrder(payload);
      } catch (error) {
        errorResponse = error;
      }

      expect(errorResponse.message).toBe("The field example is empty.");
    });
  });

  describe("process payment action", () => {
    it("should return an order id response is successful", async () => {
      const mockSuccessResponse = { id: 2242421 };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const payload = {};

      const response = await actions.processPayment(payload);
      expect(response.id).toBe(2242421);
    });

    it("should return error if response is unsuccessful", async () => {
      const mockErrorResponse = { message: "The apikey is invalid." };

      const fetchResponse = {
        ok: false,
        json: () => mockErrorResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const payload = {};
      let errorResponse;

      try {
        await actions.processPayment(payload);
      } catch (error) {
        errorResponse = error;
      }

      expect(errorResponse.message).toBe("The apikey is invalid.");
    });
  });
});
