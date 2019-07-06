import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import styles from "./product.module.scss";
import Radio from "../shared/product/Radio";
import QuantityToggle from "../shared/product/QuantityToggle";
import DisplayError from "../shared/error/DisplayError";
import {
  addToCart as addProductToCart,
  updateCartItem
} from "../../action/cart.action";
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

    const payload = {
      cart_id: window.localStorage.getItem("cartId"),
      product_id: product.product_id,
      attributes: `${productSize}, ${productColor}`
    };

    const response = await addProductToCart(payload);

    updateProductQuantity(response);
    resetState();

    toast.success("Product has been added to cart");
  };

  const updateProductQuantity = async response => {
    const payload = { quantity, itemId: response[0].item_id };

    const res = await updateCartItem(payload);

    const updatedProduct = res.find(product => {
      return product.item_id === response[0].item_id;
    });

    const newCartItem = {
      ...response[0],
      quantity: updatedProduct.quantity
    };
    dispatch(actions.SET_CART_ITEMS([...state.cartItems, newCartItem]));
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

  const resetState = () => {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(rad => (rad.checked = false));

    setQuantity(1);
    setProductSize(null);
    setProductColor(null);
    clearErrors();
  };

  return (
    <>
      <div className="product-view-product">
        <h1 className={`${styles.product_name}`}>{product.name}</h1>
        {/* <div className="product-view-rating my-2">
          <div className="review_stars">
            <span className="icon icon--rating fas fa-star" />
            <span className="icon icon--rating fas fa-star" />
            <span className="icon icon--rating fas fa-star" />
            <span className="icon icon--rating fas fa-star-half-alt" />
            <span className="icon icon--rating far fa-star" />
            <span className="heading-font">(150)</span>
          </div>
        </div> */}
        <hr />
        <div className="product-view-description my-2">
          <p className="is-size-4">{product.description}</p>
        </div>
        <hr />
      </div>
      <div className="product-view-options my-2">
        <div className="product-option-color">
          <div className="colour_swatch">
            <p className="is-uppercase has-text-weight-bold is-italic">Color</p>
            {colorError && <DisplayError message={colorError} />}
            <div className="mt-1 mb-2">
              {color.length > 0 ? (
                <div className="columns is-multiline">
                  <Radio
                    attributes={color}
                    onClick={onRadioClick}
                    isColor={true}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="colour_swatch">
            <p className="is-uppercase has-text-weight-bold is-italic">Size</p>
            {sizeError && <DisplayError message={sizeError} />}
            <div className="mt-1 mb-2">
              {size.length > 0 ? (
                <div className="columns is-multiline">
                  <Radio attributes={size} onClick={onRadioClick} />
                </div>
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
