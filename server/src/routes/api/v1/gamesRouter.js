import express from "express"
import { Game, Player, GameState } from "../../../models/index.js"
import GameSerializer from "../../../serializers/GameSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

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

gamesRouter.post("/hot-seat", async (req, res) => {
  const userId = req.user.id
  const { body } = req
  body.gameType = "hot-seat"
  const formPayload = cleanUserInput(body)
  try {
    const newGame = await Game.query().insertAndFetch(formPayload)
    const newPlayer = await Player.query().insertAndFetch({userId, gameId: newGame.id})
    const newGameState = await GameState.query().insertAndFetch({gameId: newGame.id, encodedState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"})
    res.status(200).json({game: newGame})
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

export default gamesRouter