import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProductDisplay from "../shared/product/ProductDisplay";
import Sidebar from "../shared/sidebar/Sidebar";
import { actions, CartContext } from "../context/cart.context";
import styles from "./home.module.scss";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";

export default props => {
  const categoriesURL = "https://backendapi.turing.com/categories";
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(categoriesURL)
        .then(response => response.json())
        .then(response => response);

      dispatch(actions.SET_CATEGORIES(response.rows));
    };
    fetchCategories();
  }, [categoriesURL, dispatch]);

  return (
    <>
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-2">
              <Sidebar />
            </div>
            <div className={`column ${styles.set_min_width}`}>
              <div className="">
                <section className="hero">
                  <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                      <div className="tile">
                        <div className="tile is-categoriesURL is-vertical">
                          <article className="tile is-child notification is-primary">
                            <p className="title">Fashion for all places</p>
                            <p className="subtitle">
                              Fashion for every region.
                            </p>
                            <figure className="image is-4by3 mb-1">
                              <img src={banner1} alt="first banner" />
                            </figure>
                            <Link
                              to="/department/1"
                              className="button is-warning is-uppercase"
                            >
                              Shop Now
                            </Link>
                          </article>
                        </div>
                        <div className="tile is-parent">
                          <article className="tile is-child notification is-info">
                            <p className="title">Amazing Fashion</p>
                            <p className="subtitle">
                              With a touch from nature.
                            </p>
                            <figure className="image is-4by3 mb-1">
                              <img src={banner2} alt="second banner" />
                            </figure>
                            <Link
                              to="/department/2"
                              className="button is-warning is-uppercase"
                            >
                              Shop Now
                            </Link>
                          </article>
                        </div>
                      </div>
                      <div className="tile is-parent">
                        <article className="tile is-child notification is-danger">
                          <p className="title">Fashion for all seasons</p>
                          <p className="subtitle">Top designs and brands</p>
                          <div className="content">
                            <Link
                              to="/department/1"
                              className="button is-warning is-uppercase"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </article>
                      </div>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child notification is-success">
                        <div className="content">
                          <p className="title">Seasonal Fashion</p>
                          <p className="subtitle">
                            With even more swag for every season.
                          </p>
                          <div className="content">
                            <div className="image is-4by5 mb-1">
                              <img src={banner3} alt="third banner" />
                            </div>
                            <Link
                              to="/department/3"
                              className="button is-warning is-uppercase"
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </section>
              </div>
              <ProductDisplay {...props} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
