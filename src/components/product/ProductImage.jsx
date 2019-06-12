import React from "react";
import styles from "./product.module.scss";
// import ProductImageThumbnail from "../shared/product/ProductImageThumbnail.jsx";

export default function ProductImage({ product }) {
  return (
    <>
      <div className="column is-11">
        <div className="product-image">
          <figure className="image is-5by4">
            <img
              className=""
              src={`https://backendapi.turing.com/images/products/${
                product.image
              }`}
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
        {/* <ProductImageThumbnail image={product.image} name={product.name} />
        <ProductImageThumbnail image={product.image_2} name={product.name} /> */}
      </div>
    </>
  );
}
