const { ApolloClient, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  uri: process.env.STRAPI_LINK,
  cache: new InMemoryCache(),
});

export { client };
