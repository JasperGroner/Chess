import Piece from "./Piece"
import blackImage from "../../images/pawn-black.png"
import whiteImage from "../../images/pawn-white.png"

const moveSet = [
    {vertical: 1, horizontal: 0}
]


class Pawn extends Piece {
    constructor(color) {
        if (color === "white") {
            moveSet[0].vertical = -1
        }
        super(color, blackImage, whiteImage, moveSet)
    }
}

export default Pawn