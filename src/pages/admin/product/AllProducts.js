import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { deleteProduct, getProductsOnclient } from "../../../api/product.api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";

const AllProducts = () => {
  const { token } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [currentPage, perPage]);

  const loadProducts = async () => {
    const response = await getProductsOnclient(perPage, currentPage);
    setProducts(response.data.products);
    const pages = new Array(response.data.totalPages)
      .fill(null)
      .map((v, i) => i);
    setTotalPages(pages);
  };

  const deleteHandler = async (id) => {
    const response = await deleteProduct(id, token);
    loadProducts();
  };

  return (
    <div className="container" style={{ marginBottom: "100px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col" style={{ margin: "10px 0px" }}>
          <div className="row">
            <div className="col-6">
              <h4>All Products</h4>
            </div>
            <div className="col-6">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setPerPage(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10" selected>
                  10
                </option>
                <option value="20">20</option>
              </select>
            </div>
          </div>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <th>
                    <img
                      style={{ width: "50px", height: "40px" }}
                      src={`data:image/jeg;base64,${product.images}`}
                    />
                  </th>
                  <td>{product.title}</td>
                  <td>
                    {product.category.name +
                      " - " +
                      product.sub_category.map((sub) => sub.name)}
                  </td>
                  <td>{product.price}</td>
                  <td>
                    <Link
                      to={`/admin/product/update/${product.slug}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteHandler(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllProducts;
