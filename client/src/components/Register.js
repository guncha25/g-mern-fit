import React, { useRef, useContext } from "react";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { UserCtx } from "./UserContext";
import Layout from "./Layout";

export default props => {
  const email = useRef(null);
  const username = useRef(null);
  const password = useRef(null);
  const { register } = useContext(UserCtx);

  const signIn = async event => {
    event.preventDefault();
    const error = await register(
      email.current.value,
      username.current.value,
      password.current.value
    );
    if (!error) {
      props.history.push("/");
    } else {
      alert(error);
    }
  };
  return (
    <Layout>
      <Form onSubmit={signIn}>
        <FormGroup>
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
        <FormGroup>
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
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <input
            className="form-control"
            type="password"
            ref={password}
            id="password"
            placeholder="Password"
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </FormGroup>
      </Form>
    </Layout>
  );
};
