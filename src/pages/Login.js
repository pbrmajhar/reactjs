import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleAuthProvider } from "../firebase";
import { Link } from "react-router-dom";
import axios from "../api";

const login = async (token) => {
  return await axios.post("/api/singup", {}, { headers: { token } });
};

const Login = ({ history }) => {
  const [email, setEmail] = useState("pbrmajhar@gmail.com");
  const [password, setPassword] = useState("adminadmin");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const token = await user.getIdTokenResult();

      login(token.token)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

      // dispatch({
      //   type: "LOGIN_USER",
      //   payload: {
      //     email: user.email,
      //     token: (await user.getIdTokenResult()).token,
      //   },
      // });
      // history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const token = await result.user.getIdTokenResult()
        login(token.token)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

        dispatch({
          type: "LOGIN_USER",
          payload: {
            email: result.user.email,
            token: await result.user.getIdTokenResult(),
          },
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <div className="container" style={{ marginTop: "10px" }}>
        <div className="card" style={{ width: "50%", margin: "0 auto" }}>
          <div className="card-body">
            <h5 className="card-title">Login</h5>
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
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={googleLogin}
                style={{ marginLeft: "10px" }}
              >
                Login with Google
              </button>
              <Link to={"/password/reset"} style={{ marginLeft: "10px" }}>
                Forgot password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
