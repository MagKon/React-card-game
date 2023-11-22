import React from "react";
import { getTest, register, login } from "../api/api";
import "../App.css";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  let [username, setUsername] = React.useState("");
  let [password, setPassword] = React.useState("");

  async function loginHandle() {
    if (username != "" && password != "") {
      let user = await login(username, password);
      console.log(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      window.location.replace("/main");
    }
  }

  async function registerHandle() {
    if (username != "" && password != "") {
      let user = await register(username, password);
      console.log("register");
      console.log(user);
    }
  }

  return (
    <>
      <div className="container" data-bs-theme="dark">
        <h1>Card game</h1>
        <div className="row">
          <div
            className="row align-items-center text-center"
            style={{ marginBottom: "20px" }}
          >
            <div className="col-sm-4"></div>
            <div className="col-sm-auto">
              <label htmlFor="username" className="col-form-label">
                Username:{" "}
              </label>

              <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col-auto">
              <label htmlFor="password" className="col-form-label">
                Password:{" "}
              </label>

              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <br />
          <div className="row align-items-center text-center">
            <div className="col-sm-4"></div>
            <div className="col-sm-5">
              <button
                className="btn btn-primary"
                onClick={loginHandle}
                style={{ minWidth: "45%", marginRight: "10px" }}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={registerHandle}
                style={{ minWidth: "45%" }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
