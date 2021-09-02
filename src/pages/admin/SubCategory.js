import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

import { getCategories } from "../../api/category.api";
import {
  create,
  getSubCategories,
  updateSubCat,
  deleteSubcat,
} from "../../api/subcategory.api";
import SubcategoryForm from "../../components/forms/Subcategory.form";

const SubCategory = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [parCategory, setParCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    loadCats();
    loadSubCats();
  }, []);

  const loadCats = async () => {
    const result = await getCategories();
    setCategories(result.data);
  };
  const loadSubCats = async () => {
    const result = await getSubCategories();
    setSubCategories(result.data);
    //console.log(result)
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    if (!id) {
      if (parCategory) {
        await create(name, parCategory, user.token);
        setName("");
        loadSubCats();
      } else {
        alert("please select a category!");
      }
    } else {
      const result = await updateSubCat(slug, name, parCategory, user.token);
      loadSubCats();
    }
  };

  const updateCat = (id, name, slug, parent) => {
    setId(id);
    setName(name);
    setSlug(slug);
    setParCategory(parent);
  };

  const deleteSub = async (slug) => {
    await deleteSubcat(slug, user.token);
    loadSubCats();
  };

  const searched = (keword) => (c) => c.name.toLowerCase().includes(keword);

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col">
          <SubcategoryForm
            id={id}
            categories={categories}
            name={name}
            parCategory={parCategory}
            setParCategory={setParCategory}
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
            {subCategories.filter(searched(keyword)).map((cat) => (
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
                  onClick={() => deleteSub(cat.slug)}
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
                    updateCat(cat._id, cat.name, cat.slug, cat.parent);
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

export default SubCategory;
