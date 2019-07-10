const { PubSub, withFilter } = require('graphql-subscriptions')

const pubsub = new PubSub()

const comments = []

module.exports = {
  Query: {
    getComments: () => comments
  },

  Mutation: {
    addComment: (root, { message }, context) => {
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
    },
    // commentAdded: {
    //   subscribe: withFilter(
    //     () => pubsub.asyncIterator('comments'),
    //     (playload, variables) => {
    //       return playload.commentAdded.message.length > 5
    //     }
    //   )
    // },
    // commentAdded: {
    //   subscribe: () => pubsub.asyncIterator('comments'),
    //   resolve: (payload, args, context, info) => {
    //     payload.commentAdded.message = payload.commentAdded.message + ` (I've through a resolver!)`
    //     return payload.commentAdded
    //   }
    // }
  }
}
