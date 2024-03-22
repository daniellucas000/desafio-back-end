import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';
import { expect } from 'chai';
interface MyContext {
  token?: string;
}

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });

let serverUrl: string = '';

before(async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: 4000 },
    });
    serverUrl = url;
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.log('Failed to connect:', error);
    process.exit(1);
  }
});

describe('GraphQL Server', () => {
  it('verifica se a consulta hello retorna "Hello world!"', async () => {
    try {
      const response = await axios.post(serverUrl, {
        query: `
           query {
             hello
           }
         `,
      });
      expect(response.data.data.hello).to.equal('Hello world!');
    } catch (error) {
      console.error('Failed to request:', error);
    }
  });
});
