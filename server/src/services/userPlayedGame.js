const userPlayedGame = async (game, userId) => {
  const users = await game.$relatedQuery("users")
  for (const user of users) {
    if (user.id === userId) {
      return true
    }
  }
  return false
}

export default userPlayedGame