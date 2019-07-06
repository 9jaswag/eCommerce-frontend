import * as actions from "../../action/auth.action";

describe("Auth actions", () => {
  const realFetch = global.fetch;

  afterEach(() => {
    global.fetch = realFetch;
  });

  describe("login action", () => {
    it("should return a user token", async () => {
      const mockSuccessResponse = {
        accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
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
        email: "dude@email.com",
        password: "password"
      };

      const response = await actions.login(payload);

      expect(response.accessToken).toBe(
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      );
    });

    it("should return an error", async () => {
      const mockFailureResponse = {
        error: "user does not exist"
      };

      const fetchResponse = {
        ok: false,
        json: () => mockFailureResponse
      };

      const fetch = jest.fn(() => new Promise(reject => reject(fetchResponse)));

      global.fetch = fetch;

      const payload = {
        email: "dude@email.com",
        password: "passwords"
      };

      let errorResponse;

      try {
        await actions.login(payload);
      } catch (error) {
        errorResponse = error;
      }

      expect(errorResponse.error).toEqual("user does not exist");
    });
  });

  describe("register action", () => {
    it("should return a user token", async () => {
      const mockSuccessResponse = {
        accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
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
        name: "dude",
        email: "dude@email.com",
        password: "password"
      };

      const response = await actions.register(payload);

      expect(response.accessToken).toBe(
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      );
    });

    it("should return an error", async () => {
      const mockFailureResponse = {
        error: "email field is required"
      };

      const fetchResponse = {
        ok: false,
        json: () => mockFailureResponse
      };

      const fetch = jest.fn(() => new Promise(reject => reject(fetchResponse)));

      global.fetch = fetch;

      const payload = {
        name: "dude",
        password: "passwords"
      };

      let errorResponse;

      try {
        await actions.register(payload);
      } catch (error) {
        errorResponse = error;
      }

      expect(errorResponse.error).toEqual("email field is required");
    });
  });

  describe("get user action", () => {
    it("should return a user token", async () => {
      const mockSuccessResponse = {
        accessToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
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
        email: "dude@email.com",
        password: "password"
      };

      const response = await actions.getUser(payload);

      expect(response.accessToken).toBe(
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      );
    });

    it("should return an error", async () => {
      const mockFailureResponse = {
        error: "user does not exist"
      };

      const fetchResponse = {
        ok: false,
        json: () => mockFailureResponse
      };

      const fetch = jest.fn(() => new Promise(reject => reject(fetchResponse)));

      global.fetch = fetch;

      const payload = {
        email: "dude@email.com",
        password: "passwords"
      };

      let errorResponse;

      try {
        await actions.getUser(payload);
      } catch (error) {
        errorResponse = error;
      }

      expect(errorResponse.error).toEqual("user does not exist");
    });
  });
});
