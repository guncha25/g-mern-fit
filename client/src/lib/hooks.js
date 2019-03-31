import { useState } from "react";
import Client from "./Client";
import { CURRENT_USER, LOGOUT_USER, USER_LOGIN } from "./query";

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
  const me = () => {
    Client.query({
      query: CURRENT_USER
    })
      .then(({ data: { me: { email, username } } }) => {
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
  return [user, me, login, logout];
};
