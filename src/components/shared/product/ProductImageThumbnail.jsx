import React from "react";

export default function ProductImageThumbnail({ image, name }) {
  return (
    <figure className="image is-128x128">
      <img
        className="pointer"
        src={`https://backendapi.turing.com/images/products/${image}`}
        alt={`${name} thumbnail`}
        title={`${name} thumbnail`}
      />
    </figure>
  );
}
