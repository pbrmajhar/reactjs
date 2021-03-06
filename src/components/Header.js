import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import "./style.css";
import Search from "./forms/Search";
import { loginReducer, logoutReducer } from "../store/reducers/user";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const {products} = useSelector(state => state.cart)
  const logout = () => {
    firebase.auth().signOut();
    dispatch(logoutReducer());
    history.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          App Name
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/cart"
                  >
                    Cart
                    <span class="badge bg-primary rounded-pill">{products.length}</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <Search />
          <ul
            className="navbar-nav ml-auto mb-4 mb-lg-0"
            style={{ float: "right" }}
          >
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/singup"
                  >
                    Singup
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <button className="btn nav-link" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
