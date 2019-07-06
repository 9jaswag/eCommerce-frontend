import * as actions from "../../action/customer.action";

describe("Customer actions", () => {
  const realFetch = global.fetch;

  afterEach(() => {
    global.fetch = realFetch;
  });

  describe("update profile action", () => {
    it("should return a user's detail", async () => {
      const mockSuccessResponse = {
        customer_id: 1,
        name: "Lannucci",
        email: "lannucci@hotmail.com",
        address_1: "QI 19",
        address_2: "",
        city: "",
        region: "",
        postal_code: "",
        country: "",
        shipping_region_id: 1,
        day_phone: "+351323213511235",
        eve_phone: "+452436143246123",
        mob_phone: "+351323213511235",
        credit_card: "XXXXXXXX5100"
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
        name: "Lannucci"
      };

      const response = await actions.updateProfile(payload);

      expect(response.name).toBe("Lannucci");
    });
  });

  describe("update user's address action", () => {
    it("should return a user's detail", async () => {
      const mockSuccessResponse = {
        customer_id: 1,
        name: "Lannucci",
        email: "lannucci@hotmail.com",
        address_1: "QI 20",
        address_2: "",
        city: "",
        region: "",
        postal_code: "",
        country: "",
        shipping_region_id: 1,
        day_phone: "+351323213511235",
        eve_phone: "+452436143246123",
        mob_phone: "+351323213511235",
        credit_card: "XXXXXXXX5100"
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
        address: "QI 20"
      };

      const response = await actions.updateAddress(payload);

      expect(response.address_1).toBe("QI 20");
    });
  });

  describe("update user's credit card detail action", () => {
    it("should return a user's detail", async () => {
      const mockSuccessResponse = {
        customer_id: 1,
        name: "Lannucci",
        email: "lannucci@hotmail.com",
        address_1: "QI 20",
        address_2: "",
        city: "",
        region: "",
        postal_code: "",
        country: "",
        shipping_region_id: 1,
        day_phone: "+351323213511235",
        eve_phone: "+452436143246123",
        mob_phone: "+351323213511235",
        credit_card: "4242 4242 4242 4242"
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
        credit_card: "4242 4242 4242 4242"
      };

      const response = await actions.updateCreditCard(payload);

      expect(response.credit_card).toBe("4242 4242 4242 4242");
    });
  });

  describe("get user's region action", () => {
    it("should return a region", async () => {
      const mockSuccessResponse = {
        shipping_region_id: 1,
        shipping_region: "Please Select"
      };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.getRegions();

      expect(response.shipping_region_id).toBe(1);
    });
  });

  describe("get shipping option action", () => {
    it("should return a region", async () => {
      const mockSuccessResponse = {
        shipping_id: 1,
        shipping_type: "Next Day Delivery ($20)",
        shipping_cost: "20.00",
        shipping_region_id: 2
      };

      const fetchResponse = {
        ok: true,
        json: () => mockSuccessResponse
      };

      const fetch = jest.fn(
        () => new Promise(resolve => resolve(fetchResponse))
      );

      global.fetch = fetch;

      const response = await actions.getShippingOptions(1);

      expect(response.shipping_type).toBe("Next Day Delivery ($20)");
    });
  });

  describe("get order details action", () => {
    it("should return a region", async () => {
      const mockSuccessResponse = {
        order_id: 1,
        product_id: 1,
        attributes: "LG, Red",
        product_name: "Arc d'Triomphe",
        quantity: 1,
        unit_cost: "14.99",
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

      const response = await actions.getOrder(1);

      expect(response.product_name).toBe("Arc d'Triomphe");
    });
  });

  describe("get user's orders action", () => {
    it("should return a region", async () => {
      const mockSuccessResponse = {
        order_id: 1,
        product_id: 1,
        attributes: "LG, Red",
        product_name: "Arc d'Triomphe",
        quantity: 1,
        unit_cost: "14.99",
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

      const response = await actions.getOrders();

      expect(response.product_name).toBe("Arc d'Triomphe");
    });
  });
});
