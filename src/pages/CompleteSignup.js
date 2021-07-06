import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";

const CompleteSignup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const isEmail = window.localStorage.getItem("registerEmail");
    if (!isEmail) {
      return;
    }
    setEmail(isEmail);
  }, []);

  const loginHandle = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("email and password is required!");
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("registerEmail");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const token = await user.getIdTokenResult();
        dispatch({
          type: "LOGIN_USER",
          payload: {
            email: result.user.email,
            token: token.token,
          },
        });
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
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
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

export default CompleteSignup;
