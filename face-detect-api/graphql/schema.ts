export const typeDefs = `#graphql

type User {
  id: ID!
  email: String!
}

type AuthResponse {
  token: String!
  user: User!
}

type Query {
  hello: String
}

type Mutation {
  signup(
   username: String!
    email: String!
    password: String!
  ): AuthResponse

  login(
    email: String!
    password: String!
  ): AuthResponse
}
`;