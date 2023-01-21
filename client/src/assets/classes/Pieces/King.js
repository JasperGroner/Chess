import Piece from "./Piece"
import blackImage from "../../images/king-black.png"
import whiteImage from "../../images/king-white.png"

const moveSet = [
    {vertical: 1, horizontal: -1},
    {vertical: 1, horizontal: 0},
    {vertical: 1, horizontal: 1},
    {vertical: 0, horizontal: -1},
    {vertical: 0, horizontal: 1},
    {vertical: -1, horizontal: -1},
    {vertical: -1, horizontal: 0},
    {vertical: -1, horizontal: 1}
]

class King extends Piece {
    constructor(color) {
        super(color, blackImage, whiteImage, moveSet)
    }
}

export default King