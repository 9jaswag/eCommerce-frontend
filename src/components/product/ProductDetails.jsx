import React, { useState, useContext } from "react";
import styles from "./product.module.scss";
import Radio from "../shared/product/Radio";
import QuantityToggle from "../shared/product/QuantityToggle";
import DisplayError from "../shared/error/DisplayError";
import { addToCart as addProductToCart } from "../../action/cart.action";
import { actions, CartContext } from "../context/cart.context";
import { displayPrice } from "../../helpers/displayPrice";

export default function ProductDetails({ product, color, size }) {
  const [quantity, setQuantity] = useState(1);
  const [productSize, setProductSize] = useState(null);
  const [productColor, setProductColor] = useState(null);
  const [quantityError, setQuantitiyError] = useState(null);
  const [sizeError, setSizeError] = useState(null);
  const [colorError, setColorError] = useState(null);
  const { state, dispatch } = useContext(CartContext);
  const [price, slashedPrice] = displayPrice(
    product.price,
    product.discounted_price
  );

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

  const addToCart = async () => {
    const hasError = validatePurchase();

    if (hasError) return;

    // add quantity to state for later calculation
    const payload = {
      cart_id: window.localStorage.getItem("cartId"),
      product_id: product.product_id,
      attributes: `${productSize}, ${productColor}`
    };

    const response = await addProductToCart(payload);
    dispatch(actions.SET_CART_ITEMS(response));
  };

  const validatePurchase = () => {
    clearErrors();
    let error = false;

    if (parseInt(quantity, 10) < 1 || isNaN(quantity)) {
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
    setQuantity(1);
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
          <QuantityToggle quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
      <div className="">
        <p className="heading-font is-size-1 is-inline-block">{price}</p>
        <del>
          <small className="heading-font is-size-5 mx-1">{slashedPrice}</small>
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
