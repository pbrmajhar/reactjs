import React, { useState, useEffect } from "react";
import { getProduct } from "../api/product.api";
import "./Single.style.css";

const Single = ({ match }) => {
  const [product, setProduct] = useState("");
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = async () => {
    const result = await getProduct(slug);
    setProduct(result.data);
  };
  return (
    <div className="container">
      <h3 style={{ margin: "10px 0px 10px 0px" }}>{product.title}</h3>
      <div class="container">
        <div class="row">
          <div class="col">
            <img src={`data:image/jeg;base64,${product.images}`} />
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>Price</td>
                      <td>$ {product.price}</td>
                    </tr>
                    <tr>
                      <td>Category :</td>
                      {product.sub_category && product.sub_category.map((category) => (
                        <td>{category.name}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
