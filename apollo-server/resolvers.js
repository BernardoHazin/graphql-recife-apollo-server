import GraphQLJSON from 'graphql-type-json'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

const comments = []

export default {
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

/* setInterval(() => {
  if (comments.length > 10) comments.shift()
  const message = 'hey you!'.repeat(Math.ceil(Math.random() * 10))
  const date = Date.now()
  comments.push({ message, date })
  pubsub.publish('comments', { commentAdded: { message, date } })
}, 4000) */
