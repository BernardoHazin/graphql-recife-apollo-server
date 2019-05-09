const server = require('vue-cli-plugin-apollo/graphql-server')

const opts = {
  host: 'localhost',
  port: process.env.PORT || 4000,
  graphqlPath: '/graphql',
  subscriptionsPath: '/graphql',
  enableMocks: false,
  enableEngine: false,
  cors: process.env.CORS || '*',
  timeout: 1000000,
  quiet: true,
  paths: {
    typeDefs: require.resolve('./apollo-server/type-defs.js'),
    resolvers: require.resolve('./apollo-server/resolvers.js'),
    context: require.resolve('./apollo-server/context.js'),
    directives: require.resolve('./apollo-server/directives.js'),
    dataSources: require.resolve('./apollo-server/data-sources.js')
  }
}

server(opts, () => {
  console.log('Apollo server is running!')
})
