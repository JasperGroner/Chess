import Serializer from "./Serializer.js";

class PuzzleMoveSerializer extends Serializer{
  static getSummary(puzzleMoves) {
    const serializedMoves = []
    for (const move of puzzleMoves) {
      serializedMoves.push(this.serialize(move, ["moveStart", "moveEnd", "moveNumber", "pawnUpgrade"]))
    }
    return serializedMoves
  }
}

export default PuzzleMoveSerializer