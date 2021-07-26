import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createProduct } from "../../../api/product.api";
import { getCategories, getSubCats } from "../../../api/category.api";
import Sidebar from "../Sidebar";

// import slugify from "slugify";
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  sub_category: [],
  quantity: "",
  images: [],
  shipping: "",
  colors: "",
  brands: "",
  size: "",
};

const Product = () => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadCats();
  }, []);
  console.log(values.sub_category);

  const loadCats = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await createProduct(values, user.token);
      window.alert(`${result.data.title} is created`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCats = async (id) => {
    const response = await getSubCats(id);
    setValues({...values, sub_category: []})
    setSubCategories(response.data);

  };
  return (
    <div className="container" style={{ marginBottom: "100px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col" style={{ marginBottom: "10px" }}>
          <h4>Create Product</h4>
          {JSON.stringify(values)}
          <form onSubmit={submitHandler}>
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={values.description}
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                value={values.price}
                onChange={(e) =>
                  setValues({ ...values, price: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setValues({ ...values, category: e.target.value });
                  fetchSubCats(e.target.value);
                }}
              >
                <option selected>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Sub Category</label>
              <select
                className="form-select"
                multiple
                onChange={(e) => {
                  setValues({ ...values, sub_category: [e.target.value] });
                }}
              >
                <option selected>Select Sub Category</option>
                {subCategories.map((cat, index) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                    selected={index === values.sub_category}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Quantity</label>
              <input
                type="text"
                className="form-control"
                value={values.quantity}
                onChange={(e) =>
                  setValues({ ...values, quantity: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Shipping</label>
              <select
                className="form-select"
                onChange={(e) =>
                  setValues({ ...values, shipping: e.target.value })
                }
              >
                <option selected>Select Shipping</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Colors</label>
              <select
                className="form-select"
                onChange={(e) =>
                  setValues({ ...values, colors: e.target.value })
                }
              >
                <option selected>Select Color</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Brands</label>
              <select
                className="form-select"
                onChange={(e) =>
                  setValues({ ...values, brands: e.target.value })
                }
              >
                <option selected>Select Brand</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Size</label>
              <select
                className="form-select"
                onChange={(e) => setValues({ ...values, size: e.target.value })}
              >
                <option selected>Select size</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
