import React, { useState, useEffect } from "react";
import {
  getDepartment,
  getDepartmentProducts
} from "../../action/product.action";
import GroupHero from "./GroupHero";
import GroupProducts from "./GroupProducts";

export default function Department(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  const [products, setProducts] = useState({});
  const [department, setDepartment] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const productsResponse = await getDepartmentProducts(id);
      const departmentResponse = await getDepartment(id);

      setProducts(productsResponse);
      setDepartment(departmentResponse);
    };

    fetchProducts();
  }, [id]);
  console.log(products);

  return (
    <section>
      {Object.entries(department).length > 0 && (
        <GroupHero
          name={department.name}
          description={department.description}
        />
      )}
      {Object.entries(products).length > 0 ? (
        <GroupProducts products={products} setProducts={setProducts} />
      ) : (
        "No product"
      )}
    </section>
  );
}
