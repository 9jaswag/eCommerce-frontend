import React from "react";

export default function ProductImageThumbnail({ image, name, onClick }) {
  return (
    <figure className="image is-96x96">
      <img
        className="pointer"
        src={`https://backendapi.turing.com/images/products/${image}`}
        alt={`${name} thumbnail`}
        title={`${name} thumbnail`}
        style={{ height: "6rem" }}
        onClick={onClick}
      />
    </figure>
  );
}
