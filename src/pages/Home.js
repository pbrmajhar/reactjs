import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return <div>
      this is home page 
      <Link to="/user/dashboard">Hi there</Link>
  </div>;
};

export default Home;
