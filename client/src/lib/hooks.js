import { useState } from "react";
import Client from "./Client";
import { LOGOUT_USER, USER_LOGIN, USER_REGISTER } from "./query";

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
  const register = (email, username, password) => {
    const output = Client.mutate({
      mutation: USER_REGISTER,
      variables: { email, username, password }
    })
      .then(({ data: { register: { email, username } } }) => {
        setUser({ email, username });
        return null;
      })
      .catch(er => er.message);
    return output;
  };
  return [user, login, logout, register, setUser];
};
