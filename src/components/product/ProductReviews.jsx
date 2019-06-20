import React from "react";

export default function ProductReviews({ review }) {
  let reviewStars = null;
  let noneRating = null;

  if (review.rating <= 0) {
    reviewStars = [...Array(5)].map((count, index) => (
      <span key={index} className="icon icon--rating far fa-star" />
    ));
  } else {
    const reviewCount = review.rating < 5 ? review.rating : 5;
    const remainingRating = 5 - reviewCount;

    reviewStars = [...Array(reviewCount)].map((count, index) => (
      <span key={index} className="icon icon--rating fas fa-star" />
    ));

    if (remainingRating > 0) {
      noneRating = [...Array(remainingRating)].map((count, index) => (
        <span key={index} className="icon icon--rating far fa-star" />
      ));
    }
  }

  return (
    <div className="column is-4">
      <article className="has-background-white p1">
        <div className="review_stars">
          {reviewStars} {noneRating}
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
