import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const setup = (options = {}) => {
  configure({ adapter: new Adapter() });
  if (!options.component) {
    throw new Error(
      "In order to use the setup() helper you must provide a component class"
    );
  }

  const { mountComponent, props } = options;
  const component = <options.component {...props} />;
  const wrapper = mountComponent ? mount(component) : shallow(component);

  return { props, wrapper };
};

export default setup;
