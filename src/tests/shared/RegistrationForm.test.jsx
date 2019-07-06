import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
import RegistrationForm from "../../components/shared/header/RegistrationForm";

afterEach(cleanup);

describe("<RegistrationForm />", () => {
  it("should render without crashing", () => {
    const { getByText } = render(<RegistrationForm />);

    const button = getByText("Sign Up");
    expect(button).toHaveTextContent("Sign Up");
  });

  it("should display validation error", () => {
    const { getByText, container } = render(<RegistrationForm />);

    const emailInput = container.querySelector("#email");
    const button = getByText("Sign Up");

    fireEvent.change(emailInput, { target: { value: "dude@email.com" } });

    fireEvent.click(button);

    const error = getByText("fill all fields appropriately");
    expect(error).toHaveTextContent("fill all fields appropriately");
  });

  it("should attempt to submit the form", () => {
    const { getByText, container } = render(<RegistrationForm />);

    const emailInput = container.querySelector("#email");
    const nameInput = container.querySelector("#name");
    const passwordInput = container.querySelector("#password");
    const button = getByText("Sign Up");

    fireEvent.change(emailInput, { target: { value: "dude@email.com" } });
    fireEvent.change(nameInput, { target: { value: "dude" } });
    fireEvent.change(passwordInput, { target: { value: "secretpassword" } });

    fireEvent.click(button);

    // response
  });
});
