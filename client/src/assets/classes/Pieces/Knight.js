import Piece from "./Piece"
import blackImage from "../../images/knight-black.png"
import whiteImage from "../../images/knight-white.png"

const moveSet = [
  {vertical: 2, horizontal: -1},
  {vertical: 2, horizontal: 1},
  {vertical: 1, horizontal: -2},
  {vertical: 1, horizontal: 2},
  {vertical: -1, horizontal: -2},
  {vertical: -1, horizontal: 2},
  {vertical: -2, horizontal: -1},
  {vertical: -2, horizontal: 1}
]


class Knight extends Piece {
  constructor(color) {
    super(color, blackImage, whiteImage, moveSet)
  }
}

export default Knight