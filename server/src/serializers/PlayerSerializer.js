import Serializer from "./Serializer.js"
import UserSerializer from "./UserSerializer.js"

class PlayerSerializer extends Serializer{
  static async getSummary(players, userId) {
    const serializedPlayers = []
    let color, opponent
    for (const player of players) {
      const serializedPlayer = this.serialize(player, ["userId", "color"])
      const user = await player.$relatedQuery("user")
      const serializedUser = UserSerializer.getDetail(user)
      serializedPlayer.username = serializedUser.username
      if (userId) {
        if (player.userId === userId) {
          color = player.color
        } else {
          opponent = serializedPlayer.username
        }
      }
      serializedPlayers.push(serializedPlayer)
    }
    return {serializedPlayers, color, opponent}
  }
}

export default PlayerSerializer