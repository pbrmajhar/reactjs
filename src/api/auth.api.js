import axios from "axios";

axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const login = async (token) => {
  return await axios.post("/api/singup", {}, { headers: { token } });
};
