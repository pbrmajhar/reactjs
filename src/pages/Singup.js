import React, { useState } from "react";
import { auth } from "../firebase";

const Singup = () => {
  const [email, setEmail] = useState("");

  const loginHandle = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    window.localStorage.setItem("registerEmail", email);
    setEmail("");
  };

  return (
    <div className="">
      <div className="container" style={{ marginTop: "10px" }}>
        <div className="card" style={{ width: "50%", margin: "0 auto" }}>
          <div className="card-body">
            <h5 className="card-title">Register</h5>
            <form onSubmit={loginHandle}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;