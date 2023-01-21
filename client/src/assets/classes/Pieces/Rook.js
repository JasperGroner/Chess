import Piece from "./Piece"
import blackImage from "../../images/rook-black.png"
import whiteImage from "../../images/rook-white.png"

const moveSet = [
    {vertical: 1, horizontal: 0, repeating: true},
    {vertical: 0, horizontal: -1, repetaing: true},
    {vertical: 0, horizontal: 1, repeating: true},
    {vertical: -1, horizontal: 0, repeating: true}
]

class Rook extends Piece {
    constructor(color) {
        super(color, blackImage, whiteImage, moveSet)
    }
}

export default Rook