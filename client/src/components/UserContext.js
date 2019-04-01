import React from "react";
import { useUser } from "../lib/hooks";
import { Query } from "react-apollo";
import { CURRENT_USER } from "../lib/query";

const UserCtx = React.createContext();

export default props => {
  const [user, login, logout, setUser] = useUser();
  return (
    <Query query={CURRENT_USER}>
      {({ data, loading, error }) => {
        if (!loading && !error && !user.signout && setUser(data.me));
        return (
          <UserCtx.Provider value={{ user, login, logout, setUser }}>
            {props.children}
          </UserCtx.Provider>
        );
      }}
    </Query>
  );
};

export { UserCtx };
