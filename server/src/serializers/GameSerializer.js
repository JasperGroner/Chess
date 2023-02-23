import Serializer from "./Serializer.js";
import PlayerSerializer from "./PlayerSerializer.js";
import userPlayedGame from "../services/userPlayedGame.js";
import PuzzleMoveSerializer from "./PuzzleMoveSerializer.js";
import getPuzzlePlayerColor from "../services/getPuzzlePlayerColor.js";

class GameSerializer extends Serializer {
  static async getSummarySwitcher({games, userId, gameType}) {
    if (gameType === "puzzle") {
      return await this.getPuzzleSummary(games)
    }
    return await this.getSummaryByUser(games, userId)
  }

  static async getSummaryByUser(games, userId) {
    const serializedGames = []
    for (const game of games) {
      if (await userPlayedGame(game, userId)) {
        serializedGames.push(await this.getDetail(game, userId))
      }
    }
    return serializedGames
  }

  static async getPuzzleSummary(games) {
    const serializedGames = []
    for (const game of games) {
      serializedGames.push(await this.getPuzzleDetail(game))
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

  static async getDetailSwitch(game, userId) {
    if (game.gameType === "puzzle") {
      return await this.getPuzzleDetail(game)
    }
    return await this.getDetailByUser(game, userId)
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

  static async getPuzzleDetail(game) {
    const serializedGame = this.serialize(game, ["id", "name", "gameType", "status"])
    const puzzleMoves = await game.$relatedQuery("puzzleMoves")
    serializedGame.puzzleMoves = PuzzleMoveSerializer.getSummary(puzzleMoves)
    serializedGame.color = await getPuzzlePlayerColor(game)
    return serializedGame
  }
}

export default GameSerializer