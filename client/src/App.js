import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Home from "./components/Home";
import UserContext from "./components/UserContext";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

export default () => {
  return (
    <UserContext>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </UserContext>
  );
};
