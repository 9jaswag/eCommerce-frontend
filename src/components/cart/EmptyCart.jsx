import React from "react";
import image from "../../assets/images/empty-cart.png";
import styles from "./cart.module.scss";

export default function EmptyCart() {
  return (
    <div>
      <figure className={`image ${styles.empty_cart}`}>
        <img src={image} alt="Empty cart" />
      </figure>
    </div>
  );
}
