import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/singup" exact component={Singup} />
      <Route path="/dashboard" exact component={Dashboard} />
    </BrowserRouter>
  );
}

export default App;
