import React from "react";
import { Link } from "react-router-dom";
import styles from "./product.module.scss";
import { displayPrice } from "../../../helpers/displayPrice";

export default function({ product, onClick }) {
  const [price, slashedPrice] = displayPrice(
    product.price,
    product.discounted_price
  );
  return (
    <div className={`column is-3 ${styles.is_6_tablet}`}>
      <article className={styles.product_card}>
        <figure className="product_card-figure image is-square">
          <img
            className="product_card-image pointer"
            src={`https://backendapi.turing.com/images/products/${
              product.thumbnail
            }`}
            alt={`${product.name} thumbnail`}
            title={`${product.name} thumbnail`}
            onClick={onClick}
          />
        </figure>
        <div className="product_card-body mt-1">
          <h4 className="product_card-title">{product.name}</h4>
          <div className={`${styles.product_card_text} is-flex mt-1`}>
            <div className={`${styles.discounted_price}`}>
              <span className="">{price}</span>
            </div>
            <div className="price">
              <span>
                <del>{slashedPrice}</del>
              </span>
            </div>
          </div>
          <div className="product_cta">
            <Link
              to={`/products/${product.product_id}`}
              className="button is-rounded mt-2 is-uppercase"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
