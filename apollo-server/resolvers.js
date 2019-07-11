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
    //     (playload, args) => {
    //       console.log(`I'm args!`, args)
    //       return playload.commentAdded.message.length > 5
    //     }
    //   )
    // }
    // commentAdded: {
    //   subscribe: () => pubsub.asyncIterator('comments'),
    //   resolve: (payload, args, context, info) => {
    //     console.log(`I'm args!`, args)
    //     payload.commentAdded.message = payload.commentAdded.message + ` (I've been through a resolver!)`
    //     return payload.commentAdded
    //   }
    // }
  }
}
