import React from "react";
import { useUser } from "../lib/hooks";

const UserCtx = React.createContext();

export default props => {
  const [user, me, login, logout, register] = useUser();
  if (!user.username && !user.signout && me());
  return (
    <UserCtx.Provider value={{ user, login, me, logout, register }}>
      {props.children}
    </UserCtx.Provider>
  );
};

export { UserCtx };
