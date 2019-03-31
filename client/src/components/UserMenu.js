import React, { useContext } from "react";
import DropdownLink from "./DropdownLink";
import { withRouter } from "react-router-dom";
import {
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { UserCtx } from "./UserContext";

const UserMenu = props => {
  const { user, logout } = useContext(UserCtx);
  const signOut = () => {
    logout();
    props.history.push("/");
  };
  if (!user.username) {
    return (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Sign In
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownLink to="/login">Login</DropdownLink>
            <DropdownLink to="/register">Sign up</DropdownLink>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  }
  return (
    <Nav className="ml-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {user.username}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownLink to="/profile">Profile</DropdownLink>
          <button className="dropdown-item" onClick={signOut}>
            Logout
          </button>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );
};

export default withRouter(UserMenu);
