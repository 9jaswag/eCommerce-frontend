import React from "react";
import Header from "./shared/header/Header";

export default function Layout(props) {
  return (
    <div>
      <Header {...props} />
      {props.children}
    </div>
  );
}
