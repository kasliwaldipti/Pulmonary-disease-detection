import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import fire from "../firebase/config";

export default class Header extends Component {
  render() {
    let navigation;
    if (fire.auth().currentUser != null) {
      navigation = (
        <Nav.Link href="/Dashboard" className="navitem">
          Dashboard
        </Nav.Link>
      );
    } else {
      navigation = (
        <Nav.Link href="/Login" className="navitem">
          Login
        </Nav.Link>
      );
    }
    return (
      <div>
        <h1 id="header" align="center">
          PDDA
        </h1>
        <Navbar variant="dark" collapseOnSelect expand="lg" className="nav1">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/" className="navitem">
                Home
              </Nav.Link>
              <Nav.Link href="/Guidelines" className="navitem">
                Guidelines
              </Nav.Link>
              <Nav.Link href="/Resources" className="navitem">
                Covid Resources
              </Nav.Link>
              <Nav.Link href="/Vaccination" className="navitem">
                Vaccination Details
              </Nav.Link>
              {/* <Nav.Link href="/Diagnosis" className="navitem">Diagnosis</Nav.Link> */}
              {navigation}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
