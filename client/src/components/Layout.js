import React, { Fragment } from "react";
import { Container } from "reactstrap";
import Navigation from "./Navigation";

export default ({ children }) => {
  return (
    <Fragment>
      <Navigation />
      <Container>{children}</Container>
    </Fragment>
  );
};
