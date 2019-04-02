import React, { useRef, useContext } from "react";
import { Button, Form, FormGroup, Label, Alert } from "reactstrap";
import { Mutation } from "react-apollo";
import { USER_REGISTER } from "../lib/query";
import { UserCtx } from "./UserContext";
import Layout from "./Layout";

export default props => {
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const { setUser } = useContext(UserCtx);
  return (
    <Mutation mutation={USER_REGISTER}>
      {(register, { error, loading }) => {
        return (
          <Layout>
            <Form
              onSubmit={async e => {
                e.preventDefault();
                try {
                  const res = await register({
                    variables: {
                      email: email.current.value,
                      username: username.current.value,
                      password: password.current.value
                    }
                  });
                  setUser(res.data.register);
                  props.history.push("/");
                } catch (err) {}
              }}
            >
              {error &&
                error.graphQLErrors.map(({ message }, i) => (
                  <Alert color="danger" key={i}>
                    {message}
                  </Alert>
                ))}
              <FormGroup disabled={loading}>
                <Label htmlFor="email">Email address</Label>
                <input
                  className="form-control"
                  type="email"
                  aria-describedby="email"
                  ref={email}
                  id="email"
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup disabled={loading}>
                <Label htmlFor="username">Username</Label>
                <input
                  className="form-control"
                  type="text"
                  aria-describedby="username"
                  ref={username}
                  id="username"
                  placeholder="Username"
                />
              </FormGroup>
              <FormGroup disabled={loading}>
                <Label htmlFor="password">Password</Label>
                <input
                  className="form-control"
                  type="password"
                  ref={password}
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>
              <FormGroup disabled={loading}>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </Layout>
        );
      }}
    </Mutation>
  );
};
