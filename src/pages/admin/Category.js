import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
// import slugify from "slugify";
import { useSelector } from "react-redux";
import {
  create,
  getCategories,
  updateCategory,
  deleteCategories,
} from "../../api/category.api";
import CategoryForm from "../../components/forms/Category.form";

const Category = () => {
  const user = useSelector((state) => state.user.value);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [id, setId] = useState("");
  const [keyword, setKeyword] = useState("");
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
    if (!id) {
      await create(name, user.token);
      setName("");
      loadCats();
    } else {
      await updateCategory(name, slug, user.token);
      setId("");
      setName("");
      setSlug("");
      loadCats();
    }
  };

  const updateCat = async (_id, name, slug) => {
    setId(_id);
    setName(name);
    setSlug(slug);
  };

  const deleteCat = async (slug) => {
    const result = await deleteCategories(slug, user.token);
    loadCats();
  };

  const searched = (keyword) => (c) => (
     c.name.toLowerCase().includes(keyword)
  );

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col">
          <CategoryForm
            id={id}
            name={name}
            saveCategory={saveCategory}
            setName={setName}
          />
        </div>

        <div className="col">
          <div className="col-12">
            <label className="form-label">Search</label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: "10px" }}
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value.toLowerCase());
              }}
            />
          </div>
          <ul className="list-group">
            {categories.filter(searched(keyword)).map((cat) => (
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
                <button
                  className=""
                  style={{
                    border: 0,
                    float: "right",
                    padding: "0px",
                    backgroundColor: "transparent",
                    color: "red",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    updateCat(cat._id, cat.name, cat.slug);
                  }}
                >
                  <i className="fas fa-pencil-alt"></i>
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
