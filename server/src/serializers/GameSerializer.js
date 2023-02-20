import Serializer from "./Serializer.js";
import PlayerSerializer from "./PlayerSerializer.js";
import userPlayedGame from "../services/userPlayedGame.js";

class GameSerializer extends Serializer {
  static async getSummaryByUser(games, userId) {
    const serializedGames = []
    for (const game of games) {
      if (await userPlayedGame(game, userId)) {
        serializedGames.push(await this.getDetail(game, userId))
      }
    }
    return serializedGames
  }

  static async getSummary(games) {
    const serializedGames = []
    for (const game of games) {
      serializedGames.push(await this.getDetail(game))
    }
    return serializedGames
  }

  static async getDetailByUser(game, userId) {
    if (await userPlayedGame(game, userId)) {
      return await this.getDetail(game, userId)
    }
    return {}
  }

  static async getDetail(game, userId) {
    const serializedGame = this.serialize(game, ["id", "name", "gameType", "status"])
    const players = await game.$relatedQuery("players")
    const serializedResult = await PlayerSerializer.getSummary(players, userId)
    serializedGame.color = serializedResult.color
    serializedGame.opponent = serializedResult.opponent
    serializedGame.players = serializedResult.serializedPlayers
    return serializedGame
  }
}

export default GameSerializer