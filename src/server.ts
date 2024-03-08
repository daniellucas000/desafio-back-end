import 'reflect-metadata';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { HelloResolver } from './resolvers/HelloResolver';

async function main() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log(`Server runing on ${url}`);
}

main();
