import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { products } = useSelector((state) => state.cart);
  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row">
        <h3>Product Details</h3>
        
      </div>
    </div>
  );
};

export default Checkout;
