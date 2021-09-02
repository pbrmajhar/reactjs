import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductsOnclient, productSearch } from "../api/product.api";
import Pagination from "../components/Pagination";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState([]);

  const text = useSelector((state) => state.search.value);

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    searchHandler(text);
  }, [text]);

  const loadProduct = async () => {
    const response = await getProductsOnclient(perPage, currentPage);
    setProducts(response.data.products);
    const pages = new Array(response.data.totalPages)
      .fill(null)
      .map((v, i) => i);
    setTotalPages(pages);
  };

  const searchHandler = async (text) => {
    const response = await productSearch(text);
    setProducts(response.data);
  };

  return (
    <div className="container">
      <div className="new-product-secton">
        <div className="row">
          <h3 style={{ margin: "10px 0px 10px 0px" }}>New Products</h3>
          {products.map((product) => (
            <div className="col-3" key={product._id}>
              <div className="card">
                <div className="card-body">
                  <img
                    className="card-img-top"
                    src={`data:image/jeg;base64,${product.images}`}
                  />
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    {" "}
                    <span className="currency ">$</span> {product.price}
                  </p>
                  <div className="justify-content-center">
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: "5px" }}
                    >
                      Buy now
                    </button>
                    <Link
                      to={`/product/${product.slug}`}
                      className="btn btn-secondary"
                    >
                      See
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {products.length >= 1 && (
            <Pagination
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
