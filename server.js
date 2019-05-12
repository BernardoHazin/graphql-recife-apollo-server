const typeDefs = require('./apollo-server/type-defs')
const resolvers = require('./apollo-server/resolvers')
const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({ typeDefs, resolvers })

server
  .listen({ port: process.env.PORT || 4000, subscriptions: 'subscriptions' })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
