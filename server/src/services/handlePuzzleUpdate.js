import fetch from "node-fetch"
import { Game, GameState, PuzzleMove } from "../models/index.js"
import daysSince from "./daysSince.js"
import dotenv from "dotenv";
dotenv.config()

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.CHESS_PUZZLE_KEY,
		'X-RapidAPI-Host': 'chess-puzzles.p.rapidapi.com'
	}
};

const handlePuzzleUpdate = async currentPuzzles => {
  let mostRecentPuzzle = currentPuzzles[currentPuzzles.length - 1]?.createdAt || 0
  if (daysSince(mostRecentPuzzle) > 1) {
    try {
      const response = await fetch('https://chess-puzzles.p.rapidapi.com/?themes=%5B%22mate%22%5D&themesType=ALL&count=20', options)
      const newPuzzles = await response.json()
      console.log(newPuzzles)
      await Game.query().where("gameType", "puzzle").delete()
      const puzzleArray = newPuzzles.puzzles
      for (let i = 0; i < puzzleArray.length; i++) {
        const puzzle = puzzleArray[i]
        console.log(puzzle.moves)
        const newGame = await Game.query().insertAndFetch({name: `Today's Puzzle #${i + 1}`, gameType: "puzzle", status: "playing"})
        await GameState.query().insert({gameId: newGame.id, encodedState: puzzle.fen})
        for (let j = 0; j < puzzle.moves.length; j++) {
          const move = puzzle.moves[j]
          await PuzzleMove.query().insert({gameId: newGame.id, moveStart: move.slice(0, 2), moveEnd: move.slice(2, 4), moveNumber: j})
        }
      }
      const updatedPuzzles = await Game.query().where("gameType", "puzzle")
      return updatedPuzzles
    } catch(error) {
      console.log(error)
    }
  }
  return currentPuzzles
}

export default handlePuzzleUpdate
