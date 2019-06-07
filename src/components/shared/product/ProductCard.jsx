import React from "react";
import styles from "./product.module.scss";

export default function({ product }) {
  return (
    <div className={`column is-3 ${styles.is_6_tablet}`}>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={`https://backendapi.turing.com/images/products/${
                product.thumbnail
              }`}
              alt={`${product.name} thumbnail`}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{product.name}</p>
            </div>
          </div>
          <div className={`content ${styles.elipsis}`}>
            {product.description}
          </div>
        </div>
        <footer className="card-footer">
          <span className="card-footer-item">$400.00</span>
          <a href="#" className="card-footer-item is-uppercase">
            Add to cart
          </a>
        </footer>
      </div>
    </div>
  );
}
