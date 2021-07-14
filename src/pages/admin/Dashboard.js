import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">this is admin deshboard page</div>
      </div>
    </div>
  );
};

export default Dashboard;
