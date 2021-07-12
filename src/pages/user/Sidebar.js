import React from "react";
import { NavLink } from "react-router-dom";
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link" exact activeClassName="active" to="/user/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact activeClassName="active" to="/user/password">
            Password
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact activeClassName="active" to="/">
            Link
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
