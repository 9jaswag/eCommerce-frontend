import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import Loader from "../loader/Loader";
import ProductDisplayModal from "./ProductDisplayModal";
import styles from "./product.module.scss";

export default function ProductDisplay(props) {
  const {
    match: {
      params: { id },
      path
    }
  } = props;

  const baseURL = "https://backendapi.turing.com";
  const [products, setProducts] = useState({
    count: 0,
    rows: []
  });
  const [paginationMetadata, setPaginationMetadata] = useState({
    page: 1,
    limit: 12
  });
  const [modalImage, setModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const buildProductURL = () => {
      const { page, limit } = paginationMetadata;

      if (path.includes("search"))
        return `${baseURL}/products/search/?query_string=${
          props.location.search.split("=")[1]
        }&page=${page}&limit=${limit}`;

      if (!id) return `${baseURL}/products?page=${page}&limit=${limit}`;

      if (path.includes("category"))
        return `${baseURL}/products/inCategory/${id}?page=${page}&limit=${limit}`;

      if (path.includes("department"))
        return `${baseURL}/products/inDepartment/${id}?page=${page}&limit=${limit}`;
    };

    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch(buildProductURL())
        .then(response => response.json())
        .then(response => response);

      setProducts(response);
      setIsLoading(false);
    };
    fetchProducts();
  }, [id, paginationMetadata, path, props.location.search]);

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
        forcePage={paginationMetadata.page - 1}
      />
    );
  };

  const showImageModal = event => {
    const {
      target: { src }
    } = event;

    setModalImage(src);

    const modal = document.querySelector(`.modal.product-display`);
    modal.classList.add("is-active");
  };

  const paginate = () => {
    const { limit, page } = paginationMetadata;
    const data = {
      total: products.count,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(products.count / limit),
      from: (page - 1) * limit + 1,
      to: Math.min(limit * page, products.count)
    };

    return `Showing ${data.from} - ${data.to} of ${data.total} products`;
  };

  return (
    <div className="">
      <ProductDisplayModal src={modalImage} />
      {isLoading ? (
        <div className="container">
          <div className="columns is-centered is-vcentered is-mobile">
            <Loader />
          </div>
        </div>
      ) : (
        <div>
          {products.count > 0 ? (
            <>
              <h3 className="is-uppercase is-size-4 has-text-centered my-3">
                {paginate()}
              </h3>
              <div className="columns is-multiline">
                {products.count === 0 ? (
                  <div className={styles.loader_wrapper}>
                    <Loader />
                  </div>
                ) : (
                  products.rows.map(product => (
                    <ProductCard
                      key={product.product_id}
                      product={product}
                      onClick={showImageModal}
                    />
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
            </>
          ) : (
            <div className="section">
              <h3 className="has-text-centered">No product found</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
