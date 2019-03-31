import React, { useRef, useContext } from "react";
import { Container, Button, Form, FormGroup, Label } from "reactstrap";
import { UserCtx } from "./UserContext";

export default props => {
  const email = useRef(null);
  const password = useRef(null);
  const { login } = useContext(UserCtx);

  const signIn = async event => {
    event.preventDefault();
    login(email.current.value, password.current.value);
    props.history.push("/");
  };
  return (
    <Container>
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
    </Container>
  );
};
