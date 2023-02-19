import Serializer from "./Serializer.js"
import UserSerializer from "./UserSerializer.js"

class PlayerSerializer extends Serializer{
  static async getSummary(players) {
    const serializedPlayers = []
    for (const player of players) {
      const serializedPlayer = this.serialize(player, ["userId", "color"])
      const user = await player.$relatedQuery("user")
      const serializedUser = UserSerializer.getDetail(user)
      serializedPlayer.username = serializedUser.username
      serializedPlayers.push(serializedPlayer)
    }
    return serializedPlayers
  }
}

export default PlayerSerializer