import React, { useState, useEffect, useContext } from "react";
import { getDepartment } from "../../action/product.action";
import GroupHero from "./GroupHero";
import ProductDisplay from "../shared/product/ProductDisplay";
import Sidebar from "../shared/sidebar/Sidebar";
import Loader from "../shared/loader/Loader";
import { actions, CartContext } from "../context/cart.context";

export default function Department(props) {
  const {
    match: {
      params: { id }
    }
  } = props;

  const categoriesURL = "https://backendapi.turing.com/categories/inDepartment";

  const [department, setDepartment] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await getDepartment(id);

      setDepartment(response);
      setIsLoading(false);
    };

    fetchProducts();

    const fetchCategories = async () => {
      const response = await fetch(`${categoriesURL}/${id}`)
        .then(response => response.json())
        .then(response => response);

      dispatch(actions.SET_CATEGORIES(response));
    };
    fetchCategories();
  }, [id, dispatch]);

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
