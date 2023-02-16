import Piece from "./Piece"
import blackImage from "../../assets/images/bishop-black.png"
import whiteImage from "../../assets/images/bishop-white.png"

const moveSet = [
  {vertical: 1, horizontal: -1, repeating: true},
  {vertical: 1, horizontal: 1, repeating: true},
  {vertical: -1, horizontal: -1, repeating: true},
  {vertical: -1, horizontal: 1, repeating: true}
]

class Bishop extends Piece {
  constructor(color) {
    super(color, blackImage, whiteImage, moveSet)
  }
}

export default Bishop