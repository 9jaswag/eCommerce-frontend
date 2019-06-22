import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import styles from "./product.module.scss";
import { addReview } from "../../action/product.action";
import { AuthContext } from "../context/auth.context";

export default function ProductReview({ id, reviews, setReviews }) {
  const [review, setReview] = useState({
    product_id: id,
    rating: null,
    review: ""
  });
  const [isLoading, setisLoading] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const id = `star-${review.rating}`;
    const star = document.querySelector(`#${id}`);

    if (star) {
      star.checked = true;
    } else {
      const stars = document.querySelectorAll(".review__stars input");
      stars.forEach(star => (star.checked = false));
    }
  });

  const onSubmit = async event => {
    setisLoading(true);
    event.preventDefault();

    const reviewDetail = { ...review };

    if (
      !reviewDetail.product_id ||
      !reviewDetail.rating ||
      !reviewDetail.review ||
      isNaN(parseInt(reviewDetail.rating, 10))
    ) {
      toast.error("Please enter a review and select a rating!");
      setisLoading(false);
      return;
    }

    reviewDetail.rating = parseInt(review.rating, 10);

    try {
      const response = await addReview(reviewDetail);

      const newReviews = [
        {
          created_on: new Date(Date.now()),
          review: reviewDetail.review,
          rating: reviewDetail.rating,
          name: state.user.name
        },
        ...reviews
      ];

      setReviews(newReviews);

      setReview({ ...review, rating: null, review: "" });
      toast.success("Review submitted");
    } catch (error) {
      toast.error("An error occired. Please try again!");
    }

    setisLoading(false);
  };

  const onClick = event => {
    const {
      target: { value, name }
    } = event;

    setReview({ ...review, [name]: value });
  };

  return (
    <div className="column is-half is-offset-one-quarter mb-2">
      <form className="" onSubmit={onSubmit}>
        <textarea
          name="review"
          className="textarea"
          value={review.review}
          placeholder="Write a review"
          required
          onChange={onClick}
        />
        <div className="review__stars my-2">
          <input
            type="radio"
            name="rating"
            value="5"
            id="star-5"
            onClick={onClick}
          />
          <label htmlFor="star-5" />
          <input
            type="radio"
            name="rating"
            value="4"
            id="star-4"
            onClick={onClick}
          />
          <label htmlFor="star-4" />
          <input
            type="radio"
            name="rating"
            value="3"
            id="star-3"
            onClick={onClick}
          />
          <label htmlFor="star-3" />
          <input
            type="radio"
            name="rating"
            value="2"
            id="star-2"
            onClick={onClick}
          />
          <label htmlFor="star-2" />
          <input
            type="radio"
            name="rating"
            value="1"
            id="star-1"
            onClick={onClick}
          />
          <label htmlFor="star-1" />
        </div>
        <button
          className={`button is-primary is-fullwidth is-uppercase is-size-6 has-text-weight-semibold ${
            styles.review_submit_button
          } ${isLoading ? "is-loading" : ""}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
