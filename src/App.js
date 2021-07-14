import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { currentUser } from "./api/auth.api";
import UserRoute from "./routes/User.routes";
import AdminRoute from "./routes/Admin.routes";

// All components
import Header from "./components/Header";
import Home from "./pages/Home";
import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import CompleteSignup from "./pages/CompleteSignup";
import ForgotPassword from "./pages/ForgotPassword";
import Password from "./pages/user/Password";
import Category from "./pages/admin/Category";

const App = () => {
  const history = useHistory()
  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/dashboard");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        currentUser(token.token)
          .then(async (res) => {
            dispatch({
              type: "LOGIN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                note: "autoloading...",
                picture: res.data.picture,
                email: res.data.email,
                role: res.data.role,
                token: token.token,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.error(err));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/singup" exact component={Singup} />
        <UserRoute path="/user/dashboard" exact component={UserDashboard} />
        <UserRoute path="/user/password" exact component={Password} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/category" exact component={Category} />
        <Route path="/register/complete" exact component={CompleteSignup} />
        <Route path="/password/reset" exact component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default App;
