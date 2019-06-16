import React, { useState, useEffect } from "react";
import { getCategory } from "../../action/product.action";
import GroupHero from "./GroupHero";
import ProductDisplay from "../shared/product/ProductDisplay";

export default function Category(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const departmentResponse = await getCategory(id);

      setCategory(departmentResponse);
    };

    fetchProducts();
  }, [id]);

  return (
    <section>
      {Object.entries(category).length > 0 && (
        <GroupHero name={category.name} description={category.description} />
      )}
      <div className="container">
        <ProductDisplay {...props} />
      </div>
    </section>
  );
}
