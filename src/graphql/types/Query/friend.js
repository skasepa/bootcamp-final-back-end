const User = require('../../../models/User')
const Friend = require('../../../models/Friend.js')

const friendsResolver = async (obj, { id }, context) => {
  try {
    // check if user is logged in
    if (!context.user) {
      throw new Error('User is not logged in or token has expired')
    }
    const user = await User.query().findById(id)
    if (!user) {
      throw new Error('Invalid ID provided')
    }

    const friends = await User.findByIds(
      Friend.query()
        .select('following')
        .where('follower', context.user.id),
    )
    return {
      success: true,
      friends,
    }
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    }
  }
  // const friendsResolver = async (obj, args, context) => {
  //   // TODO: Write a resolver which returns a user given a user id.
  //   // if (!context.user) throw new Error('User not logged in')
  //   const user = await User.query().where('email', 'like', `${args.email}`)
  //   return user
}

const resolver = {
  Query: {
    friends: friendsResolver,
  },
}

module.exports = resolver
