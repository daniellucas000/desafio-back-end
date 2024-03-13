import 'dotenv/config';
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { resolvers } from './graphql/resolvers/user';
import { typeDefs } from './graphql/types/user';
interface MyContext {
  token?: string;
}

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
}

startServer();
