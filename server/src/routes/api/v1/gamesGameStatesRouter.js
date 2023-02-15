import express from "express"
import { GameState } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"

const gamesGameStatesRouter = new express.Router({mergeParams: true})

gamesGameStatesRouter.post("/", async (req, res) => {
  const { body } = req
  const gameId = req.params.gameId
  body.gameId = gameId
  const formPayload = cleanUserInput(body)
  try {
    const newGameState = await GameState.query().insert(formPayload)
    return res.status(200).json({newGameState})
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data})
    }
    return res.status(500).json({ errors: error })
  }
})

export default gamesGameStatesRouter