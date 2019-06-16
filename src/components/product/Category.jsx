import React, { useState, useEffect } from "react";
import { getCategory, getCategoryProducts } from "../../action/product.action";
import GroupHero from "./GroupHero";
import GroupProducts from "./GroupProducts";

export default function Category(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  const [products, setProducts] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const productsResponse = await getCategoryProducts(id);
      const departmentResponse = await getCategory(id);

      setProducts(productsResponse);
      setCategory(departmentResponse);
    };

    fetchProducts();
  }, [id]);

  return (
    <section>
      {Object.entries(category).length > 0 && (
        <GroupHero name={category.name} description={category.description} />
      )}
      {Object.entries(products).length > 0 ? (
        <GroupProducts products={products} setProducts={setProducts} />
      ) : (
        "No product"
      )}
    </section>
  );
}
