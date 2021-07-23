import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            exact
            activeClassName="active"
            to="/admin/category"
          >
            Categoty
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            exact
            activeClassName="active"
            to="/admin/sub/category"
          >
            Sub Categoty
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            exact
            activeClassName="active"
            to="/admin/product"
          >
            Add Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
