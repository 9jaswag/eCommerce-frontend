import React, { useState, useEffect } from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductReview from "./ProductReview";
import ProductReviews from "./ProductReviews";

export default function Product(props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const baseURL = "https://backendapi.turing.com";
  const [product, setProduct] = useState({});
  const [color, setColor] = useState({});
  const [size, setSize] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // if no product id
    // if no product
    const fetchProduct = async () => {
      const response = await fetch(`${baseURL}/products/${id}`)
        .then(response => response.json())
        .then(response => response);

      setProduct(response);
    };
    fetchProduct();

    const fetchAttrubutes = async () => {
      const response = await fetch(`${baseURL}/attributes/inProduct/${id}`)
        .then(response => response.json())
        .then(response => response);

      const attributes = transformAttributes(response);

      setColor(attributes.Color);
      setSize(attributes.Size);
    };

    fetchAttrubutes();

    const fetchReviews = async () => {
      const response = await fetch(`${baseURL}/products/${id}/reviews`)
        .then(response => response.json())
        .then(response => response);
      console.log(response);

      setReviews(response);
    };

    fetchReviews();
  }, [id]);

  const transformAttributes = attributes => {
    return attributes.reduce((output, value) => {
      output[value.attribute_name] = output[value.attribute_name] || [];
      output[value.attribute_name].push(value);
      return output;
    }, {});
  };

  return (
    <>
      <div className="">
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-two-thirds">
                {Object.entries(product).length > 0 ? (
                  <ProductImage product={product} />
                ) : null}
              </div>
              <div className="column">
                {Object.entries(product).length > 0 ? (
                  <ProductDetails product={product} color={color} size={size} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="has-background-light">
          <div className="section">
            <div className="">
              <h1 className="is-uppercase is-size-2 has-text-centered">
                Reviews
              </h1>
            </div>
            <div className="container">
              <ProductReview />
            </div>
            <div className="container">
              <div className="columns is-multiline">
                {reviews.length > 0
                  ? reviews.map((review, index) => (
                      <ProductReviews key={index} review={review} />
                    ))
                  : "No reviews"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
