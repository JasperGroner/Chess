import SquareDecoder from "./SquareDecoder"

class Puzzle {
  constructor(game, moves, loadGameFunction, selectFunction) {
    this.moves = moves.sort((a, b) => {
      return a.moveNumber - b.moveNumber
    })
    this.puzzleLength = moves.length / 2
    this.selectFunction = selectFunction
    this.moveIterator = 0
    loadGameFunction(game)
    this.computerMove()
  }

  computerMove() {
    if (this.moveIterator >= this.moves.length) {
      return false
    }

    this.decodeAndSelect(this.moves[this.moveIterator].moveStart)

    // implement wait 1 second later

    this.decodeAndSelect(this.moves[this.moveIterator].moveEnd)
    
    this.moveIterator +=  2

    return true
  }

  decodeAndSelect(encodedLocation) {
    const decodedLocation = SquareDecoder.decodeSquare(encodedLocation)
    this.selectFunction(selectPiece.row, selectPiece.column)
  }
}

export default Puzzle