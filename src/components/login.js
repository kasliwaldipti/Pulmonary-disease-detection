import React from "react";
import { Button } from "@material-ui/core";
import { Form } from "react-bootstrap";
import "../styles/login.css";
import { useHistory } from "react-router";
import { Footer } from "./Footer";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    emailError,
    passwordError,
  } = props;
  const history = useHistory();
  return (
    <div className="main-container">
      <div className="login">
        <div className="loginContainer">
          <Form.Text className="header">Login Details</Form.Text>
          <label>Enter Email:</label>
          <input
            type="text"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
          <label>Enter Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errorMsg">{passwordError}</p>
          <br></br>
          <Button
            variant="outlined"
            className="btn1"
            type="submit"
            onClick={handleLogin}
          >
            Sign in
          </Button>
          <br />
          <p>
            Don't have an account?{" "}
            <Button onClick={() => history.push({ pathname: "/SignUp" })}>
              Sign up
            </Button>{" "}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
