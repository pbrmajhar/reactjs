import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productSearch } from "../../api/product.api";

const Search = () => {
  const [key, setKey] = useState("");

  let dispatch = useDispatch();
  let history = useHistory();

  const { text } = useSelector((state) => state.query);
  console.log("from redux---->", text);

  const searchHandler = async (e) => {
    e.preventDefault();
    const response = await productSearch(text);
    history.push(`/result?search_query=${text}`);
    console.log(response);
  };
  const chnagesHandler = (e) => {
    dispatch({
      type: "SEARCH",
      payload: { text: e.target.value },
    });
  };

  return (
    <form onSubmit={searchHandler} className="d-flex">
      <input
        style={{ width: "350px" }}
        onChange={(e) => chnagesHandler(e)}
        className="form-control"
        type="search"
        placeholder="Search Product, type and hit enter"
      />
    </form>
  );
};

export default Search;
