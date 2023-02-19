import { Game } from "../models/index.js"
import GameSerializer from "../serializers/GameSerializer.js"

const getAvailableGames = async () => {
  const games = await Game.query().where("status", "looking")
  const serializedGames = await GameSerializer.getSummary(games)
  return serializedGames
}

export default getAvailableGames