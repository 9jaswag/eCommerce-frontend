import React from "react";
import ProductDisplay from "../shared/product/ProductDisplay";

export default function Search(props) {
  const query = props.location.search.split("=")[1];

  return (
    <div className="section">
      <div className="container">
        {query && (
          <div className="">
            <h2 className="is-size-4">{`Search for ${query}:`}</h2>
          </div>
        )}
        <ProductDisplay {...props} />
      </div>
    </div>
  );
}
