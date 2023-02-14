import Serializer from "./Serializer.js";

class GameSerializer extends Serializer {
  static async getSummaryByUser(games, userId) {
    const serializedGames = []
    for (const game of games) {
      const users = await game.$relatedQuery("users")
      for (const user of users) {
        if (user.id === userId) {
          const serializedGame = this.serialize(game, ["id", "name", "gameType"]) 
          serializedGames.push(game)
        }
      }
    }
    return serializedGames
  }

  static async getDetail(game) {
    const serializedGame = this.serialize(game, ["id", "name", "gameType"])
    const gameStates = serializedGame.$relatedQuery("gameStates")
    serializedGame.gameState = gameStates[0]
    return serializedGame
  }
}

export default GameSerializer