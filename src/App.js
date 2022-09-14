import React, { Component } from "react";
import "./App.css";
import CovidApp from "./components/CovidApp";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Diagnosis from "./components/Diagnosis";
import GuidelineCard from "./components/GuidelineCard";
import VaccinationTable from "./components/VaccinationTable";
import Main from "./components/Main";
import LoginHandler from "./components/login_signup_handler";
import Signup from "./components/signup";
import DashBoard from "./components/DashBoard";
import Resources from "./components/Resources";
import Twitter from "./components/Twitter";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Route exact path="/">
            <Redirect exact to="/Home" />
          </Route>
          <Route path="/Main" component={Main} />
          <Route path="/Home" component={CovidApp} />
          <Route path="/Guidelines" component={GuidelineCard} />
          <Route path="/Resources" component={Resources} />
          <Route path="/Twitter" component={Twitter} />
          <Route path="/Vaccination" component={VaccinationTable} />
          <Route path="/Diagnosis" component={Diagnosis} />
          <Route path="/Login" component={LoginHandler} />
          <Route path="/SignUp" component={Signup} />
          <Route path="/Dashboard" component={DashBoard} />
        </Router>
      </div>
    );
  }
}
