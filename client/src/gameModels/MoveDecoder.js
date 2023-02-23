import SquareDecoder from "./SquareDecoder";

class MoveDecoder {
  static decodeMove(encodedMove) {
    console.log(encodedMove)
    const decodedMove = {}
    decodedMove.moveStart = SquareDecoder.decodeSquare(encodedMove.moveStart)
    decodedMove.moveEnd = SquareDecoder.decodeSquare(encodedMove.moveEnd)
    return decodedMove
  }
}

export default MoveDecoder