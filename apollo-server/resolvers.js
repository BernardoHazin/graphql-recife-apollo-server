const GraphQLJSON = require('graphql-type-json')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const comments = []

module.exports = {
  JSON: GraphQLJSON,

  Query: {
    getComments: root => comments
  },

  Mutation: {
    addComment: (root, { message }) => {
      if (comments.length > 10) comments.shift()
      const comment = {
        message,
        date: Date.now()
      }
      comments.push(comment)
      pubsub.publish('comments', { commentAdded: comment })
      return message
    }
  },

  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator('comments')
    }
  }
}
