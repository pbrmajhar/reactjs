import axios from "./api";

export const createProduct = async (product, token) => {
  return axios.post("/api/create", product, { headers: { token } });
};

// export const getProducts = async (perPage, currentPage) => {
//   return axios.get(`/api/products/${count}`);
// };

export const getProductsOnclient = async (perPage, currentPage) => {
  return axios.get(
    `/api/products?perpage=${perPage}&currentpage=${currentPage}`
  );
};

export const getProduct = async (slug) => {
  return axios.get(`/api/product/${slug}`);
};

export const productSearch = async (key) => {
  return axios.post(`/api/product/search`, { search: key });
};

export const deleteProduct = async (id, token) => {
  return axios.delete(`/api/product/${id}`, { headers: { token } });
};
