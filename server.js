const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const resolversArray = loadFilesSync('**/*.resolvers.js');

const { mongoConnect } = require('./services/mongo');
const { loadProductsData } = require('./products/products.model');

const PORT = process.env.PORT || 3000;

async function startApolloServer() {
  await mongoConnect();
  await loadProductsData();

  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`Running Apollo Server on port ${PORT}...`);
  });
}

startApolloServer();
