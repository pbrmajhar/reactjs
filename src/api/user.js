import axios from "./api";
export const saveCart = async (cart, token) => {
  // console.log(token)
  return await axios.post("/api/user/cart", { cart }, { headers: { token } });
};
