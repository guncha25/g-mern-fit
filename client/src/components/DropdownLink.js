import React from "react";
import { Link } from "react-router-dom";

export default ({ to, children }) => (
  <Link className="dropdown-item" to={to}>
    {children}
  </Link>
);
