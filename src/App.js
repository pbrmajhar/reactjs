import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";

import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import CompleteSignup from "./pages/CompleteSignup";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        dispatch({
          type: "LOGIN_USER",
          payload: { email: user.email, token: token.token },
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/singup" exact component={Singup} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/register/complete" exact component={CompleteSignup} />
      <Route path="/password/reset" exact component={ForgotPassword} />
    </BrowserRouter>
  );
}

export default App;
