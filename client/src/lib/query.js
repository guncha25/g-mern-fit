import gql from "graphql-tag";

export const CURRENT_USER = gql`
  query CurrentUserQuery {
    me {
      username
      email
    }
  }
`;

export const LOGOUT_USER = gql`
  query LogoutUserQuery {
    logout
  }
`;

export const USER_LOGIN = gql`
  query UserLoginQuery($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      email
    }
  }
`;
