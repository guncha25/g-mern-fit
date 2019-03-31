import React, { useReducer, useEffect } from "react";
import gql from "graphql-tag";
import Client from "./Client";

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      username
      email
    }
  }
`;

const LOGOUT_USER_QUERY = gql`
  query LogoutUserQuery {
    logout
  }
`;

const USER_LOGIN_QUERY = gql`
  query UserLoginQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      email
    }
  }
`;

const initialUser = { username: null, email: null };

function reducer(state, action) {
  switch (action.type) {
    case "SAVE_USER":
      return { ...action.payload };
    case "REMOVE_USER":
      return { username: null, email: null };
    default:
      return state;
  }
}

const userReducer = () => {
  const [user, dispatch] = useReducer(reducer, initialUser);
  const login = (email, password) => {
    Client.query({
      query: USER_LOGIN_QUERY,
      variables: { email, password }
    })
      .then(({ data: { login } }) => {
        dispatch({
          type: "SAVE_USER",
          payload: { email: login.email, username: login.username }
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const me = () => {
    Client.query({
      query: CURRENT_USER_QUERY
    })
      .then(({ data: { me } }) => {
        dispatch({
          type: "SAVE_USER",
          payload: { email: me.email, username: me.username }
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const logout = () => {
    Client.query({
      query: LOGOUT_USER_QUERY
    })
      .then(() => dispatch({ type: "REMOVE_USER" }))
      .catch(error => {
        console.log(error.message);
      });
  };

  return [user, me, login, logout];
};

const UserCtx = React.createContext();

export default props => {
  const [user, me, login, logout] = userReducer();

  useEffect(() => {}, [user]);

  if (!user.username) {
    me();
  }

  return (
    <UserCtx.Provider value={{ user, login, me, logout }}>
      {props.children}
    </UserCtx.Provider>
  );
};

export { UserCtx };
