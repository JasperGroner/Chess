import Serializer from "./Serializer.js";
import GameStateSerializer from "./GameStateSerializer.js";
import userPlayedGame from "../services/userPlayedGame.js";

class GameSerializer extends Serializer {
  static async getSummaryByUser(games, userId) {
    const serializedGames = []
    for (const game of games) {
      if (await userPlayedGame(game, userId)) {
        const serializedGame = this.serialize(game, ["id", "name", "gameType", "status"]) 
        serializedGames.push(serializedGame)
      }
    }
    return serializedGames
  }

  static async getSummary(games) {
    const serializedGames = []
    for (const game of games) {
      const serializedGame = this.serialize(game, ["id", "name", "gameType", "status"])
      serializedGames.push(serializedGame)
    }
    return serializedGames
  }

  static async getDetail(game, userId) {
    if (!(await userPlayedGame(game, userId))) {
      return {}
    }
    const serializedGame = this.serialize(game, ["id", "name", "gameType", "status"])
    return serializedGame
  }
}

export default GameSerializer