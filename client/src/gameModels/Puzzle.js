import SquareDecoder from "./SquareDecoder"

class Puzzle {
  constructor(moves, selectFunction) {
    this.moves = moves.sort((a, b) => {
      return a.moveNumber - b.moveNumber
    })
    this.puzzleLength = moves.length / 2
    this.selectFunction = selectFunction
    this.moveIterator = 0
  }

  nextMove() {
    if (this.moveIterator >= this.moves.length) {
      return false
    }
    
    const moveObject = {}
    
    moveObject.moveStart = SquareDecoder.decodeSquare((this.moves[this.moveIterator].moveStart))

    moveObject.moveEnd = SquareDecoder.decodeSquare((this.moves[this.moveIterator].moveEnd))
    
    this.moveIterator +=  1

    return moveObject
  }
}

export default Puzzle