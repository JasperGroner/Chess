import SquareDecoder from "./SquareDecoder";

class MoveDecoder {
  static decodeMove(encodedMove) {
    const decodedMove = {}
    decodedMove.moveStart = SquareDecoder.decodeSquare(encodedMove.moveStart)
    decodedMove.moveEnd = SquareDecoder.decodeSquare(encodedMove.moveEnd)
    decodedMove.pawnUpgrade = encodedMove.pawnUpgrade
    return decodedMove
  }
}

export default MoveDecoder