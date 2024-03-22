import 'dotenv/config';
import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { resolvers } from './graphql/resolvers/user';
import { typeDefs } from './graphql/types/user';
import { AppDataSource } from './data-source';
interface MyContext {
  token?: string;
}

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });

export async function startServer() {
  try {
    await AppDataSource.initialize();
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
    return url;
  } catch (error) {
    console.log('Failed to connect:', error);
    throw error;
  }
}

startServer();
