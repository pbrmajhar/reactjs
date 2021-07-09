import axios from "./api";

export const login = async (token) => {
  return await axios.post("/api/singup", {}, { headers: { token } });
};

export const currentUser = async (token) => {
  return await axios.post("/api/currentuser", {}, { headers: { token } });
};
