import React from "react";

const SubcategoryForm = ({
  id,
  categories,
  name,
  parCategory,
  setParCategory,
  saveCategory,
  setName,
}) => {
  return (
    <form onSubmit={saveCategory}>
      <div className="col-12">
        <label className="form-label">Select category</label>
        <select
          className="form-select"
          onChange={(c) => setParCategory(c.target.value)}
        >
          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
              selected={cat._id === parCategory}
            >
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-12">
        <label className="form-label">Subcategory Name</label>
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
        {id ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default SubcategoryForm;
