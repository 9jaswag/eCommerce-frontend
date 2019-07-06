import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import { AuthContext } from "../../components/context/auth.context";
import { act } from "react-dom/test-utils";
import EditProfile from "../../components/user/EditProfile";

afterEach(cleanup);

describe("<EditProfile />", () => {
  it("should render without crashing", () => {
    const state = {
      user: {
        name: "Dude",
        email: "dude@email.com",
        address_1: "1, some street",
        shipping_region_id: 2,
        credit_card: "4242 4242 4242 4242"
      }
    };

    const { getByText } = render(
      <AuthContext.Provider value={{ state }}>
        <EditProfile />
      </AuthContext.Provider>
    );

    const nameLabel = getByText("Name");
    expect(nameLabel).toHaveTextContent("Name");
    const emailLabel = getByText("Email");
    expect(emailLabel).toHaveTextContent("Email");
  });

  it("should update the value of the input fields", () => {
    const state = { user: { name: "Dude" } };
    const { getByPlaceholderText } = render(
      <AuthContext.Provider value={{ state }}>
        <EditProfile />
      </AuthContext.Provider>
    );

    const input = getByPlaceholderText("Enter your password");
    fireEvent.change(input, { target: { value: "secretpassword" } });
    expect(input.value).toBe("secretpassword");
  });

  it("should update the value of the credit card input", () => {
    const state = {
      user: { name: "Dude", credit_card: "4242 4242 4242 4242" }
    };
    const { getByPlaceholderText } = render(
      <AuthContext.Provider value={{ state }}>
        <EditProfile />
      </AuthContext.Provider>
    );

    const input = getByPlaceholderText("Card number");
    expect(input.value).toBe("4242 4242 4242 4242");
    fireEvent.change(input, { target: { value: "5353 5353 5353 5353" } });
    expect(input.value).toBe("5353 5353 5353 5353");
  });

  // it("should update the value of the shipping region", () => {
  //   const state = {
  //     user: { name: "Dude" }
  //   };
  //   const { getByPlaceholderText } = render(
  //     <AuthContext.Provider value={{ state }}>
  //       <EditProfile />
  //     </AuthContext.Provider>
  //   );

  //   const input = getByPlaceholderText("Card numbers");
  //   // expect(input.value).toBe("4242 4242 4242 4242");
  //   // fireEvent.change(input, { target: { value: "5353 5353 5353 5353" } });
  //   // expect(input.value).toBe("5353 5353 5353 5353");
  // });

  it("should attempt to submit the form", async () => {
    const state = {
      user: {
        name: "Dude",
        email: "dude@email.com",
        address_1: "1, some street",
        shipping_region_id: 2,
        credit_card: "4242 4242 4242 4242"
      }
    };

    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ state }}>
        <EditProfile />
      </AuthContext.Provider>
    );

    const text = getByText("Name");
    expect(text).toHaveTextContent("Name");

    const passwordField = getByPlaceholderText("Enter your password");
    fireEvent.change(passwordField, { target: { value: "secretpassword" } });

    const cardExpiryInput = getByPlaceholderText("MM/YY");
    fireEvent.change(cardExpiryInput, { target: { value: "12/24" } });

    const cvvcExpiryInput = getByPlaceholderText("CVC"); //MM/YY
    fireEvent.change(cvvcExpiryInput, { target: { value: "12/24" } });

    fireEvent.click(getByText("Update Profile"));
  });

  it("should display error messages", async () => {
    const state = {
      user: {
        name: "Dude",
        email: "dude@email.com",
        address_1: "1, some street",
        shipping_region_id: 2, // till region is fetched
        credit_card: ""
      }
    };

    // const { getByText, getByPlaceholderText } = render(
    //   <AuthContext.Provider value={{ state }}>
    //     <EditProfile />
    //   </AuthContext.Provider>
    // );

    let container;

    act(() => {
      container = render(
        <AuthContext.Provider value={{ state }}>
          <EditProfile />
        </AuthContext.Provider>
      );
    });

    const { getByText, getByPlaceholderText } = container;

    fireEvent.click(getByText("Update Profile"));

    // const errorMessage = await waitForElement(() =>
    //   getByText("Please fill all required fields appropriately.")
    // );

    // const passwordField = getByPlaceholderText("Enter your password");
    // fireEvent.change(passwordField, { target: { value: "secretpassword" } });

    // const cardExpiryInput = getByPlaceholderText("MM/YY");
    // fireEvent.change(cardExpiryInput, { target: { value: "12/24" } });

    // const cvvcExpiryInput = getByPlaceholderText("CVC"); //MM/YY
    // fireEvent.change(cvvcExpiryInput, { target: { value: "12/24" } });

    // fireEvent.click(getByText("Update Profile"));
  });
});
