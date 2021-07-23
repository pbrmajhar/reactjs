import axios from "./api";

export const createProduct = async (product, token) => {
  return axios.post("/api/product/create", product, { headers: { token } });
};
