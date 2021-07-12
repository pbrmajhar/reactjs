import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { auth } from "../../firebase";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const changePassword = (e) => {
    e.preventDefault();
    setLoading(true);
    auth.currentUser
      .updatePassword(password)
      .then(() => {
        setPassword("");
        setLoading(false);
        console.log("Password updated");
      })
      .catch(() => {
        setLoading(false);
        console.log("Something went wrong");
      });

    
  };

  return (
    <div className="container" style={{ marginTop: "10px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <form onSubmit={changePassword}>
            <div className="col-6">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
              disabled={loading || !password}
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
