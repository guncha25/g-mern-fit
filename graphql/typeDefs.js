const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    mesurements(user: ID): [Mesurement]!
    users: [User]
    user(id: String!): User!
    login(email: String!, password: String!): User
    logout: Boolean
    me: User
  }
  type Mutation {
    register(email: String!, password: String!, username: String!): User
    addMesurement(weight: Float): Mesurement!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    createdAt: String!
  }
  type Mesurement {
    id: ID!
    createdAt: String!
    weight: Int!
    user: User!
  }
`;
