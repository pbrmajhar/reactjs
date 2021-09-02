import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productSearch } from "../../api/product.api";
import {search} from "../../store/reducers/search";

const Search = () => {
  const [key, setKey] = useState("");

  let dispatch = useDispatch();
  let history = useHistory();

  const text = useSelector((state) => state.search.value);

  const searchHandler = async (e) => {
    e.preventDefault();
    const response = await productSearch(text);
    history.push(`/result`);
    console.log(response);
  };
  const chnagesHandler = (e) => {
    dispatch(
      search({
        text: e.target.value.toString()
      })
    );
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
