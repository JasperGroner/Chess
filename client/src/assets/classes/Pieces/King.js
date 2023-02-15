import Piece from "./Piece"
import blackImage from "../../images/king-black.png"
import whiteImage from "../../images/king-white.png"

class King extends Piece {
    constructor(color) {
        const canCastleKingside = (board, row, column) => {
            let checkRow
            if (color === "white") {
                if (!board.canCastle.K) {
                    return false
                }
                checkRow = 7
            } else {
                if (!board.canCastle.k) {
                    return false
                }
                checkRow = 0
            }
            if (board.boardModel[checkRow][5] || board.boardModel[checkRow][6]) {
                return false
            }
            if (board.isCheck()) {
                return false
            }
        }

        const canCastleQueenside = (board, row, column) => {
            let checkRow
            if (color === "white") {
                if (!board.canCastle.Q) {
                    return false
                }
                checkRow = 7
            } else {
                if (!board.canCastle.q) {
                    return false
                }
                checkRow = 0
            }
            if (board.boardModel[checkRow][1] || board.boardModel[checkRow][2] || board.boardModel) {
                return false
            }
            if (board.isCheck()) {
                return false
            }
        }

        const moveSet = [
            {vertical: 1, horizontal: -1},
            {vertical: 1, horizontal: 0},
            {vertical: 1, horizontal: 1},
            {vertical: 0, horizontal: -1},
            {vertical: 0, horizontal: 1},
            {vertical: -1, horizontal: -1},
            {vertical: -1, horizontal: 0},
            {vertical: -1, horizontal: 1},
            {vertical: 0, horizontal: -3, specialConditions: canCastleQueenside},
            {vertical: 0, horizontal: 2, specialConditions: canCastleKingside}
        ]
        super(color, blackImage, whiteImage, moveSet)
    }
}

export default King