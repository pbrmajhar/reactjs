import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductsOnclient } from "../api/product.api";
import Pagination from "../components/Pagination";
import _ from "lodash";
import "./Home.style.css";
import { addToCart, calculateTotal } from "../store/reducers/cartReducer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    loadProduct();
  }, [currentPage]);

  const loadProduct = async () => {
    const response = await getProductsOnclient(perPage, currentPage);
    setProducts(response.data.products);
    const pages = new Array(response.data.totalPages)
      .fill(null)
      .map((v, i) => i);
    setTotalPages(pages);
  };

  const cartHandler = (product) => {
    let cart = [];
    
    dispatch(calculateTotal(parseInt(product.price)))
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...product, count: 1 });
    // console.log(store.map((item) => item._id));
    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch(addToCart(unique))
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
                      onClick={() => cartHandler(product)}
                    >
                      Add to cart
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
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
