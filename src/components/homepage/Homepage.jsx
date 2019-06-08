import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Header from "../shared/header/Header";
import ProductCard from "../shared/product/ProductCard";
import Sidebar from "../shared/sidebar/Sidebar";
import styles from "./homepage.module.scss";

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
        previousLabel={<i className="pagination-previous">previous</i>}
        nextLabel={<i className="pagination-next">next</i>}
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
      <Header />
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-2">
              <Sidebar />
            </div>
            <div className={`column ${styles.set_min_width}`}>
              <div className="columns is-multiline">
                {products.count === 0 ? (
                  <i className="fas fa-spinner" />
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
