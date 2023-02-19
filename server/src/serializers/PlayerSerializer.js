import Serializer from "./Serializer.js"
import UserSerializer from "./UserSerialzier.js"

class PlayerSerializer extends Serializer{
  static async getSummaryByGame(players) {
    const serializedPlayers = []
    for (const player of players) {
      const serializedPlayer = this.serialize(player, ["userId", "color"])
      const user = player.$relatedQuery("user")
      serializedPlayer.username = UserSerializer.getDetailUser(user).username
      serializedPlayers.push(serializedPlayer)
    }
    return players
  }
}

export default PlayerSerializer