import React from "react";
import styles from "./product.module.scss";

export default function ProductReview() {
  return (
    <div className="column is-half is-offset-one-quarter mb-2">
      <textarea className="textarea" placeholder="Write a review" />
      <div className="review__stars my-2">
        <input type="radio" name="rating" id="star-5" required />
        <label htmlFor="star-5" />
        <input type="radio" name="rating" id="star-4" required />
        <label htmlFor="star-4" />
        <input type="radio" name="rating" id="star-3" required />
        <label htmlFor="star-3" />
        <input type="radio" name="rating" id="star-2" required />
        <label htmlFor="star-2" />
        <input type="radio" name="rating" id="star-1" required />
        <label htmlFor="star-1" />
      </div>
      <button
        className={`button is-primary is-fullwidth is-uppercase is-size-6 has-text-weight-semibold ${
          styles.review_submit_button
        }`}
      >
        Submit
      </button>
    </div>
  );
}
