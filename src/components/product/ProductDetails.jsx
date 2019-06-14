import React, { useState } from "react";
import styles from "./product.module.scss";
import Radio from "../shared/product/Radio";
import DisplayError from "../shared/error/DisplayError";

export default function ProductDetails({ product, color, size }) {
  const [quantity, setQuantity] = useState(1);
  const [productSize, setProductSize] = useState(null);
  const [productColor, setProductColor] = useState(null);
  const [quantityError, setQuantitiyError] = useState(null);
  const [sizeError, setSizeError] = useState(null);
  const [colorError, setColorError] = useState(null);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const onChange = event => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const onRadioClick = event => {
    const {
      target: {
        parentElement: { innerText },
        name
      }
    } = event;

    if (name === "Color") {
      setProductColor(innerText);
    } else {
      setProductSize(innerText);
    }
  };

  const addToCart = () => {
    const hasError = validatePurchase();

    if (hasError) return;
    console.log(quantity, productSize, productColor);
  };

  const validatePurchase = () => {
    clearErrors();
    let error = false;

    if (quantity < 1) {
      error = true;
      setQuantitiyError("Please select at least one quantity");
    }
    if (!productSize) {
      error = true;
      setSizeError("Please select at a size");
    }
    if (!productColor) {
      error = true;
      setColorError("Please select at a color");
    }

    return error;
  };

  const clearErrors = () => {
    setQuantitiyError(null);
    setSizeError(null);
    setColorError(null);
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
            {colorError && <DisplayError message={colorError} />}
            <div className="mt-1 mb-2">
              {color.length > 0 ? (
                <Radio attributes={color} onClick={onRadioClick} />
              ) : null}
            </div>
          </div>
          <div className="colour_swatch">
            <p className="is-uppercase has-text-weight-bold is-italic">Size</p>
            {sizeError && <DisplayError message={sizeError} />}
            <div className="mt-1 mb-2">
              {size.length > 0 ? (
                <Radio attributes={size} onClick={onRadioClick} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="">
          <p className="is-uppercase has-text-weight-bold is-italic">
            Quantity
          </p>
          {quantityError && <DisplayError message={quantityError} />}
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
                onChange={onChange}
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
        <button className={`${styles.cta_button}`} onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </>
  );
}
