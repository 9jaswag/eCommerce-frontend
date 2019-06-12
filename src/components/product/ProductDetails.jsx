import React, { useState } from "react";
import styles from "./product.module.scss";
import Radio from "../shared/product/Radio";

export default function ProductDetails({ product, color, size }) {
  const [quantity, setQuantity] = useState(1);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="product-view-product">
        <h1 className={`${styles.product_name}`}>{product.name}</h1>
        <div className="product-view-rating my-2">
          <div className="review_stars">
            <span className="icon icon--rating fas fa-star" />
            <span className="icon icon--rating fas fa-star" />
            <span className="icon icon--rating fas fa-star" />
            <span className="icon icon--rating fas fa-star-half-alt" />
            <span className="icon icon--rating far fa-star" />
            <span className="heading-font">(150)</span>
          </div>
        </div>
        <div className="product-view-description">
          <p className="is-size-4">{product.description}</p>
        </div>
      </div>
      <div className="product-view-options my-2">
        <div className="product-option-color">
          <div className="colour_swatch">
            <p className="is-uppercase has-text-weight-bold is-italic">Color</p>
            <div className="mt-1 mb-2">
              {color.length > 0 ? <Radio attributes={color} /> : null}
            </div>
          </div>
          <div className="colour_swatch">
            <p className="is-uppercase has-text-weight-bold is-italic">Size</p>
            <div className="mt-1 mb-2">
              {size.length > 0 ? <Radio attributes={size} /> : null}
            </div>
          </div>
        </div>
        <div className="">
          <p className="is-uppercase has-text-weight-bold is-italic">
            Quantity
          </p>
          <div className="buttons has-addons mt-1 mb-2">
            <span className="button" onClick={decrementQuantity}>
              <i className="fas fa-caret-down" />
            </span>
            <span className="button">
              <input
                className={`${styles.quantity_input}`}
                type="number"
                name="quantity"
                id="quantity"
                value={quantity}
                min="1"
                readOnly
              />
            </span>
            <span className="button" onClick={incrementQuantity}>
              <i className="fas fa-caret-up" />
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <p className="heading-font is-size-1 is-inline-block">{`$${
          product.discounted_price
        }`}</p>
        <del>
          <small className="heading-font is-size-5 mx-1">{`$${
            product.price
          }`}</small>
        </del>
      </div>
      <div className="mt-2">
        <button className={`${styles.cta_button}`}>Add to cart</button>
      </div>
    </>
  );
}
