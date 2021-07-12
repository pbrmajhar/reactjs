import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <Redirect to="/login" />
  );
};


export default UserRoute;
