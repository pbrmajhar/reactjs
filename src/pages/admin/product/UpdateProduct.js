import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProduct } from "../../../api/product.api";
import { getCategories, getSubCats } from "../../../api/category.api";
import Sidebar from "../Sidebar";

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

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { token } = useSelector((state) => state.user);
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategory();
  }, []);

  useEffect(() => {
    fetchSubCats(values.category._id);
  }, [categories]);

  const loadProduct = async () => {
    const result = await getProduct(slug);
    setValues({ ...values, ...result.data });
  };

  const loadCategory = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  const fetchSubCats = async (id) => {
    const response = await getSubCats(id);
    setSubCategories(response.data);
  };

  const submitHandler = () => {};
console.log(values.sub_category)
  return (
    <div className="container" style={{ marginBottom: "100px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col" style={{ marginBottom: "10px" }}>
          <h4>All Products</h4>
          <form onSubmit={submitHandler}>
            <div className="col-md-6">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setValues({ ...values, images: e.target.files[0] })
                }
              />
            </div>
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
                  fetchSubCats(e.target.value);
                }}
              >
                <option selected>Select Category</option>
                {values.category.name}
                {categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                    selected={cat._id === values.category._id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              {JSON.stringify(values.sub_category._id)}
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
                    selected={cat._id === values.sub_category._id}
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
                <option value="yes" selected={values.shipping === "yes"}>
                  Yes
                </option>
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
                {/* {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))} */}
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
                {/* {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))} */}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Size</label>
              <select
                className="form-select"
                onChange={(e) => setValues({ ...values, size: e.target.value })}
              >
                <option selected>Select size</option>
                {/* {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))} */}
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

export default UpdateProduct;
