import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import UserContext from "./components/UserContext";
import Login from "./components/Login";

const NontFound = () => (
  <div className="container" align="center">
    <h1>404 Page not found</h1>
  </div>
);

export default () => {
  return (
    <UserContext>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NontFound} />
        </Switch>
      </Router>
    </UserContext>
  );
};
