import React, { useState, useEffect } from "react";
import { getDepartment } from "../../action/product.action";
import GroupHero from "./GroupHero";
import ProductDisplay from "../shared/product/ProductDisplay";

export default function Department(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  const [department, setDepartment] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const departmentResponse = await getDepartment(id);

      setDepartment(departmentResponse);
    };

    fetchProducts();
  }, [id]);

  return (
    <section>
      {Object.entries(department).length > 0 && (
        <GroupHero
          name={department.name}
          description={department.description}
        />
      )}
      <div className="container">
        <ProductDisplay {...props} />
      </div>
    </section>
  );
}
