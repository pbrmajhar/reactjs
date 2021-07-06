import React, { useState } from "react";
import { auth } from "../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const submitHandle = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_FORGOT_REDIRECT,
      handleCodeInApp: true,
    };
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="">
        <div className="container" style={{ marginTop: "10px" }}>
          <div className="card" style={{ width: "50%", margin: "0 auto" }}>
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <form onSubmit={submitHandle}>
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
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
