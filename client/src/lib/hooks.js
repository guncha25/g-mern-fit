import { useState } from "react";
import Client from "./Client";
import { LOGOUT_USER, USER_LOGIN } from "./query";

export const useUser = () => {
  const [user, setUser] = useState({ username: null, email: null });
  const login = (email, password) => {
    Client.query({
      query: USER_LOGIN,
      variables: { email, password }
    })
      .then(({ data: { login: { email, username } } }) => {
        setUser({ email, username });
      })
      .catch(er => console.log(er.message));
  };
  const logout = () => {
    Client.query({
      query: LOGOUT_USER
    })
      .then(() => setUser({ username: null, email: null, signout: true }))
      .catch(er => console.log(er.message));
  };
  return [user, login, logout, setUser];
};
