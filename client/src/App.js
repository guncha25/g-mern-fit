import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Home from "./components/Home";
import UserContext from "./components/UserContext";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import { ApolloProvider } from "react-apollo";
import Client from "./lib/Client";

export default () => {
  return (
    <ApolloProvider client={Client}>
      <UserContext>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </UserContext>
    </ApolloProvider>
  );
};
