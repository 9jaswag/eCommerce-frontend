import React, { useState, useEffect } from "react";
import { getDepartment } from "../../action/product.action";
import GroupHero from "./GroupHero";
import ProductDisplay from "../shared/product/ProductDisplay";
import Sidebar from "../shared/sidebar/Sidebar";
import Loader from "../shared/loader/Loader";

export default function Department(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  const [department, setDepartment] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await getDepartment(id);

      setDepartment(response);
      setIsLoading(false);
    };

    fetchProducts();
  }, [id]);

  return (
    <section>
      {isLoading ? (
        <div className="container">
          <div className="columns is-centered is-vcentered is-mobile">
            <Loader />
          </div>
        </div>
      ) : (
        <>
          {Object.entries(department).length > 0 && (
            <GroupHero
              name={department.name}
              description={department.description}
            />
          )}
        </>
      )}
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-2">
            <div className="mt-2 ml-1">
              <Sidebar />
            </div>
          </div>
          <div className="column">
            <ProductDisplay {...props} />
          </div>
        </div>
      </div>
    </section>
  );
}
