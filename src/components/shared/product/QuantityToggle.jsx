import React from "react";
import styles from "./product.module.scss";

export default function QuantityToggle({ quantity, setQuantity }) {
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

  return (
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
  );
}
