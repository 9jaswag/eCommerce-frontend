import React from "react";

export default function DisplayError({ message }) {
  return (
    <small className="has-text-danger body-font has-text-weight-light is-size-6">
      {message}
    </small>
  );
}
