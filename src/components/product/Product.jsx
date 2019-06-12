import React, { useState, useEffect } from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";

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

  useEffect(() => {
    // if no product id
    // if no product
    const fetchProduct = async () => {
      const response = await fetch(`${baseURL}/products/${id}`)
        .then(response => response.json())
        .then(response => response);
      // console.log(response);

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
  }, [id]);

  const transformAttributes = attributes => {
    return attributes.reduce((output, value) => {
      output[value.attribute_name] = output[value.attribute_name] || [];
      output[value.attribute_name].push(value);
      return output;
    }, {});
  };

  return (
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
  );
}
