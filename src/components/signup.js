import React, { useState } from "react";
import fire from "../firebase/config";
import { Button } from "@material-ui/core";
import { Form } from "react-bootstrap";
import "../styles/login.css";
import { useHistory } from "react-router";
import "firebase/firestore";
import { Footer } from "./Footer";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hospital, setHospital] = useState("");
  const [docname, setDocName] = useState("");
  const [docemail, setDocEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignup = () => {
    clearErrors();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invaled-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            alert("Default state appeared");
            break;
        }
      });
    const db = fire.firestore();

    const userRef = db.collection("users").add({
      name: name,
      phone: phone,
      email: email,
      hospital: hospital,
      docname: docname,
      docemail: docemail,
      password: password,
    });
    if (userRef != null) {
      history.push({
        pathname: "/Login",
      });
    }
  };

  return (
    <div className="main-container">
      <div className="login">
        <div className="loginContainer">
          <Form.Text className="header">Sign Up Form</Form.Text>
          <label>Enter Name:</label>
          <input
            type="email"
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p />
          <label>Enter Phone No.:</label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p />
          <label>Enter Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
          <label>Hospital/Clinic Name:</label>
          <input
            type="email"
            required
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          />
          <p />
          <label>Doctors Name:</label>
          <input
            type="email"
            required
            value={docname}
            onChange={(e) => setDocName(e.target.value)}
          />
          <p />
          <label>Doctors Email:</label>
          <input
            type="email"
            required
            value={docemail}
            onChange={(e) => setDocEmail(e.target.value)}
          />
          <p />
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
            onClick={handleSignup}
          >
            Sign Up
          </Button>
          <br />
          <p>
            Already have an account?{" "}
            <Button onClick={() => history.push({ pathname: "/Login" })}>
              Login
            </Button>{" "}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
