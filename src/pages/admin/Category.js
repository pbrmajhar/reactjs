import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
// import slugify from "slugify";
import { useSelector } from "react-redux";
import {
  create,
  getCategories,
  deleteCategories,
} from "../../api/category.api";

const Category = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCats();
  }, []);

  const loadCats = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const result = await create(name, user.token);
    setName("");
    loadCats();
  };

  const deleteCat = async (slug) => {
    const result = await deleteCategories(slug, user.token);
    loadCats();
  };

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col">
          <form onSubmit={saveCategory}>
            <div className="col-12">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
            >
              Save
            </button>
          </form>
        </div>

        <div className="col">
          <ul className="list-group">
            {categories.map((cat) => (
              <li className="list-group-item" key={cat._id}>
                {cat.name}
                <button
                  className=""
                  style={{
                    border: 0,
                    float: "right",
                    padding: "0px",
                    backgroundColor: "transparent",
                    color: "red",
                  }}
                  onClick={() => deleteCat(cat.slug)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
