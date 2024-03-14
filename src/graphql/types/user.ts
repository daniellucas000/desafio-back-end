export const typeDefs = `
type User {
  id: ID!
  name: String!
  email: String!
  birthDate: String!
}

type Query {
  user(id: ID!): User
  users: [User]
}

input CreateUserInput {
  name: String!
  email: String!
  birthDate: String
  password: String!
 }
 
type Mutation {
  createUser(input: CreateUserInput): User
}
`;
