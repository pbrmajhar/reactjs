import axios from "./api";

export const create = async (name, token) => {
  return await axios.post("/api/cat/create", { name }, { headers: { token } });
};

export const getCategories = async () => {
  return await axios.get("/api/cat/categories");
};

export const getCategory = async (slug) => {
  return await axios.get(`/api/cat/category/${slug}`);
};

export const updateCategory = async (name, slug, token) => {
  return await axios.patch(
    `/api/category/${slug}`,
    { name },
    { headers: { token } }
  );
};

export const deleteCategories = async (slug, token) => {
  return await axios.delete(`/api/cat/category/${slug}`, {
    headers: { token },
  });
};
