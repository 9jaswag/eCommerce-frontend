import React, { useState } from "react";
import styles from "./product.module.scss";
import ProductImageThumbnail from "../shared/product/ProductImageThumbnail.jsx";

export default function ProductImage({ product }) {
  const [image, setImage] = useState(
    `https://backendapi.turing.com/images/products/${product.image}`
  );

  const onClick = event => {
    const {
      target: { src }
    } = event;

    setImage(src);
  };
  return (
    <>
      <div className="column is-11">
        <div className="product-image">
          <figure className="image is-5by4">
            <img
              className=""
              src={image}
              alt={`${product.name} thumbnail`}
              title={`${product.name} thumbnail`}
            />
          </figure>
        </div>
      </div>
      <div
        className={`product_image_thumbnail mt-2 is-flex ${
          styles.space_evenly
        }`}
      >
        <ProductImageThumbnail
          image={product.image}
          name={product.name}
          onClick={onClick}
        />
        <ProductImageThumbnail
          image={product.image_2}
          name={product.name}
          onClick={onClick}
        />
      </div>
    </>
  );
}
