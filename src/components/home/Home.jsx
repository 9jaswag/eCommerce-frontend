import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ProductCard from "../shared/product/ProductCard";
import Sidebar from "../shared/sidebar/Sidebar";
import styles from "./home.module.scss";
import Loader from "../shared/loader/Loader";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";

export default () => {
  const baseURL = "https://backendapi.turing.com";
  const [products, setProducts] = useState({
    count: 0,
    rows: []
  });
  const [paginationMetadata, setPaginationMetadata] = useState({
    page: 1,
    limit: 12
  });

  useEffect(() => {
    const buildProductURL = () => {
      const { page, limit } = paginationMetadata;
      return `${baseURL}/products?page=${page}&limit=${limit}`;
    };

    const fetchProducts = async () => {
      const response = await fetch(buildProductURL())
        .then(response => response.json())
        .then(response => response);

      setProducts(response);
    };
    fetchProducts();
  }, [paginationMetadata]);

  const handlePagination = page => {
    setPaginationMetadata({
      ...paginationMetadata,
      page: parseInt(`${page.selected + 1}`, 10)
    });
  };

  const createPagination = () => {
    const { count } = products;
    const { limit } = paginationMetadata;

    const totalPages = Math.ceil(count / limit);
    return (
      <ReactPaginate
        previousLabel={
          <i className="pagination-previous">
            <i className="fas fa-angle-double-left" />
          </i>
        }
        nextLabel={
          <i className="pagination-next">
            <i className="fas fa-angle-double-right" />
          </i>
        }
        breakLabel={<span>&hellip;</span>}
        breakClassName={"pagination-ellipsis"}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePagination}
        containerClassName={"pagination-list"}
        activeLinkClassName={"is-current"}
        pageLinkClassName={"pagination-link"}
      />
    );
  };

  return (
    <>
      {/* level maybe? */}
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
                        <div className="tile is-parent is-vertical">
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
              <h3 className="is-uppercase is-size-4 has-text-centered my-3">
                {`Showing ${
                  paginationMetadata.page
                } - ${paginationMetadata.page * 12} 0f ${
                  products.count
                } products`}
              </h3>
              <div className="columns is-multiline">
                {products.count === 0 ? (
                  <div className={styles.loader_wrapper}>
                    <Loader />
                  </div>
                ) : (
                  products.rows.map(product => (
                    <ProductCard key={product.product_id} product={product} />
                  ))
                )}
              </div>
              <nav
                className="pagination is-centered is-small is-rounded"
                role="navigation"
                aria-label="pagination"
              >
                {products.count > 0 && createPagination()}
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
