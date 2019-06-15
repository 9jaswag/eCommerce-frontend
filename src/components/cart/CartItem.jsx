import React, { useState } from "react";
import QuantityToggle from "../shared/product/QuantityToggle";
import { updateCartItem, deleteCartItem } from "../../action/cart.action";

export default function CartItem({ item, cartItems }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateItem = async () => {
    const payload = {
      quantity,
      itemId: item.item_id
    };

    const response = await updateCartItem(payload);

    cartItems(response);
  };

  const removeItem = async () => {
    const response = await deleteCartItem(item.item_id);
  };

  return (
    <section className="section has-background-light mb-2">
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img
              className="product_card-image"
              src={`https://backendapi.turing.com/images/products/${
                item.image
              }`}
              alt={`${item.name} thumbnail`}
              title={`${item.name} thumbnail`}
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="columns is-multiline">
            <div className="column is-5">
              <div className="product-name">
                <h2 className="has-text-weight-bold">{item.name}</h2>
                <span className="body-font">
                  Size: {item.attributes.split(",")[0]} &mdash;{" "}
                </span>
                <span className="body-font">
                  Colour: {item.attributes.split(",")[1]}
                </span>
                <p className="has-text-weight-bold mt-1">
                  Unit Price: {`$${item.price}`}
                </p>
              </div>
            </div>
            <div className="column is-flex">
              <div>
                <QuantityToggle quantity={quantity} setQuantity={setQuantity} />
                {quantity !== item.quantity && (
                  <div className="tags has-addons pointer" onClick={updateItem}>
                    <span className="tag is-link">Update</span>
                    <span className="tag fas fa-upload has-background-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="media-right">
          <h3 className="has-text-weight-bold mt-1">{`$${item.subtotal}`}</h3>
          <button
            className="button is-danger is-small mt-1 mr-1-half"
            onClick={removeItem}
          >
            <span className="icon">
              <i className="far fa-trash-alt" />
            </span>
            <span>Remove from cart</span>
          </button>
        </div>
      </article>
    </section>
  );
}
