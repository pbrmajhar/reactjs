import axios from "./api";

export const create = async (name, id, token) => {
  return axios.post(
    "/api/sub/cat/create",
    { name, id },
    { headers: { token } }
  );
};

export const getSubCategories = async () => {
  return axios.get("/api/sub/cat/categories");
};

export const updateSubCat = (slug, name, parentCat, token) => {
    console.log(slug, name, parentCat, token)
  return axios.patch(
    `/api/sub/cat/category/${slug}`,
    { name, parentCat },
    { headers: { token } }
  );
};

export const deleteSubcat = async (slug, token) => {
  return axios.delete(`/api/sub/cat/category/${slug}`, { headers: { token } });
};
