import Piece from "./Piece"
import blackImage from "../../images/bishop-black.png"
import whiteImage from "../../images/bishop-white.png"

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