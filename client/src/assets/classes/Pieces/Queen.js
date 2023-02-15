import Piece from "./Piece"
import blackImage from "../../images/queen-black.png"
import whiteImage from "../../images/queen-white.png"

const moveSet = [
  {vertical: 1, horizontal: -1, repeating: true},
  {vertical: 1, horizontal: 0, repeating: true},
  {vertical: 1, horizontal: 1, repeating: true},
  {vertical: 0, horizontal: -1, repeating: true},
  {vertical: 0, horizontal: 1, repeating: true},
  {vertical: -1, horizontal: -1, repeating: true},
  {vertical: -1, horizontal: 0, repeating: true},
  {vertical: -1, horizontal: 1, repeating: true}
]

class Queen extends Piece {
  constructor(color) {
    super(color, blackImage, whiteImage, moveSet)
  }
}

export default Queen