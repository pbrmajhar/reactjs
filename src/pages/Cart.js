import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/reducers/cartReducer";
import { useHistory } from "react-router";
import { saveCart } from "../api/user";

const Cart = () => {
  const { products, total } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.value);
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const saveCartHandler = async () => {
    const response = await saveCart(products, user.token);
    console.log('hello there')
  };

  const hangleQuantity = (e, id) => {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((product, i) => {
        if (product._id == id) {
          cart[i].count = parseInt(e.target.value);
          localStorage.setItem("cart", JSON.stringify(cart));
          dispatch(addToCart(cart));
        }
      });
    }
  };

  const deleteItem = (id) => {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((product, i) => {
        if (product._id == id) {
          cart.splice(i, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          dispatch(addToCart(cart));
        }
      });
    }
  };


  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row">
        <div className="col-8">
          <table className="table table-striped">
            <tbody>
              {allProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>
                    <input
                      onChange={(e) => hangleQuantity(e, product._id)}
                      value={product.count}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => deleteItem(product._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-header">Cart Summary</div>
            <div className="card-body">
              <h5 className="card-title">Total : ${total}</h5>
              <p className="card-text">{products.length} Items</p>
              <p className="card-text">Shipping Cost $20</p>
              <p className="card-text">Grand Total : ${total + 20}</p>
              <Link to="/checkout" className="btn btn-primary">
                Checkout
              </Link>
              <Link to={{ pathname: "/login", state: { from: "cart" } }}>
                Login to Checkout
              </Link>
              <button onClick={saveCartHandler}>Save cart to Database</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
