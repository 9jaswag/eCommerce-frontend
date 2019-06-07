import React, { useState } from "react";
import Header from "../shared/header/Header";
import ProductCard from "../shared/product/ProductCard";

export default () => {
  const baseURL = "https://backendapi.turing.com";
  const [products, setProducts] = useState({
    count: 0,
    rows: []
  });

  const fetchProducts = async () => {
    const response = await fetch(`${baseURL}/products`)
      .then(response => response.json())
      .then(response => response);

    setProducts(response);
  };
  fetchProducts();

  return (
    <>
      {/* level maybe? */}
      <Header />
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-2">{/* sidebar here */}</div>
            <div className="column is">
              <div className="columns is-multiline">
                {products.count === 0
                  ? "Loading"
                  : products.rows.map(product => (
                      <ProductCard key={product.product_id} product={product} />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
