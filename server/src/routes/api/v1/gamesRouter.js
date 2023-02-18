import express from "express"
import { Game, Player, GameState } from "../../../models/index.js"
import GameSerializer from "../../../serializers/GameSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import gamesGameStatesRouter from "./gamesGameStatesRouter.js"
import { ValidationError } from "objection"

const gamesRouter = new express.Router()

gamesRouter.get("/type/:gameType", async (req, res) => {
  const userId = req.user.id
  const gameType = req.params.gameType
  try { 
    const games = await Game.query().where("gameType", gameType)
    const serializedGames = await GameSerializer.getSummaryByUser(games, userId)
    res.status(200).json({games: serializedGames})
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

gamesRouter.get("/:gameId", async (req, res) => {
  const userId = req.user.id
  const gameId = req.params.gameId
  try {
    const game = await Game.query().findById(gameId)
    const serializedGame = await GameSerializer.getDetail(game, userId)
    res.status(200).json({ game: serializedGame })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

gamesRouter.delete("/:gameId", async(req, res) => {
  const gameId = req.params.gameId
  try {
    const deletedGame = await Game.query().deleteById(gameId)
    res.status(200).json({ gameId })
  } catch(error) {
    res.status(500).json({ errors: error })
  }
})

gamesRouter.post("/hotSeat", async (req, res) => {
  const userId = req.user.id
  const { body } = req
  body.gameType = "hot seat"
  body.status = "playing"
  const formPayload = cleanUserInput(body)
  try {
    const newGame = await Game.query().insertAndFetch(formPayload)
    const newPlayer = await Player.query().insertAndFetch({userId, gameId: newGame.id, color: "both"})
    const newGameState = await GameState.query().insertAndFetch({gameId: newGame.id, encodedState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"})
    const serializedGame = await GameSerializer.getDetail(newGame, userId)
    return res.status(200).json({game: serializedGame})
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

gamesRouter.use("/:gameId/gameState", gamesGameStatesRouter)

export default gamesRouter