import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler } from "reactstrap";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

export default () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };
  return (
    <Navbar color="dark" dark expand="md">
      <Link className="navbar-brand" to="/">
        G-MEAN Fit
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <UserMenu />
      </Collapse>
    </Navbar>
  );
};
