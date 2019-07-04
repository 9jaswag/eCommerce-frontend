import React from "react";
import LoginForm from "../../components/shared/header/LoginForm";
import setup from "../setup";
import { AuthProvider } from "../../components/context/auth.context";
// import { act } from "react-dom/test-utils";

const component = LoginForm;

describe("<LoginForm/>", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation(init => [init, setState]);

  it("renders without crashing", () => {
    const { wrapper } = setup({
      component
    });
    expect(wrapper.find(".section")).toHaveLength(1);
    // wrapper.getElement()
  });

  // it("calls the onChange method", () => {
  //   const { wrapper } = setup({
  //     component,
  //     mountComponent: true
  //   });

  //   const onChange = jest.fn();
  //   const onChangeSpy = jest.spyOn(component, "onChange");
  //   useStateSpy.mockImplementation(init => [init, onChange]);

  //   wrapper
  //     .find(".card-footer-item")
  //     .props()
  //     .onClick();
  //   expect(onChange).toHaveBeenCalledWith(1);
  // });

  // it("renders the DisplayError component if there's an error", () => {
  //   const { wrapper } = setup({
  //     component,
  //     mountComponent: true
  //   });

  //   // act(() => {
  //   //   wrapper.setState({ error: "some error" });
  //   // });
  //   // wrapper.instance().setError("some error");
  //   console.log(wrapper);
  //   expect(wrapper.state("error")).toBe(0);
  //   // expect(wrapper.find("DisplayError")).toHaveLength(1);
  // });
});

// loginComponent.setState({ error: true });
// LoginForm.jsx                  |    26.92 |    16.67 |       25 |    26.92 |... 45,46,47,49,50
// npm install --save-dev @testing-library/react
