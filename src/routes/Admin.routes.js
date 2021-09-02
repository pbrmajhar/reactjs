import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAdmin } from "../api/auth.api";

const AdminRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user.value);

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : "Loading..";
};

export default AdminRoute;
