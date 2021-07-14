import React from 'react'

const CategoryForm = ({id, name, saveCategory, setName}) => {
    return (
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
              { id ? "Update" : 'Save'}
            </button>
          </form>
    )
}

export default CategoryForm
