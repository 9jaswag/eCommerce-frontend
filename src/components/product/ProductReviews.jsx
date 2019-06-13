import React from "react";

export default function ProductReviews({ review }) {
  return (
    <div className="column is-4">
      <article className="has-background-white p1">
        <div className="review_stars">
          <span className="icon icon--rating far fa-star" />
          <span className="heading-font">({review.rating})</span>
        </div>
        <div className="">
          <p className="is-size-5">{review.review}</p>
        </div>
        <hr />
        <div className="">
          <p className="has-text-weight-semibold">
            {`Posted by ${review.name} on ${new Date(
              review.created_on
            ).toDateString()}`}
          </p>
        </div>
      </article>
    </div>
  );
}
