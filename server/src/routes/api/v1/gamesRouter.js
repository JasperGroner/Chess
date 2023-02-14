import express from "express"
import Game from "../../../models/Game.js"
import GameSerializer from "../../../serializers/GameSerializer.js"

const gamesRouter = new express.Router()

gamesRouter.get("/", async (req, res) => {
  const userId = req.user.id
  try { 
    const games = await Game.query()
    const serializedGames = await GameSerializer.getSummaryByUser(games, userId)
    res.status(200).json({games: serializedGames})
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

gamesRouter.get("/:gameId/load", async (req, res) => {
  const userId= req.user.id
  const gameId = req.params.gameId
  try {
    const game = await Game.query().findById(gameId)
    const serializedGame = await GameSerializer.getDetail(game, userId)
    res.status(200).json({ game: serializedGame })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

export default gamesRouter