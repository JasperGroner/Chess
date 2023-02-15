import Piece from "./Piece"
import blackImage from "../../images/king-black.png"
import whiteImage from "../../images/king-white.png"

class King extends Piece {
    constructor(color) {
        const canCastleKingside = (board, row, column) => {
            let checkRow, piece
            if (color === "white") {
                piece = "K"
                checkRow = 7
            } else {
                piece = "k"
                checkRow = 0
            }
            if (!board.canCastle[piece]) {
                return false
            }
            if (board.boardModel[checkRow][5] || board.boardModel[checkRow][6]) {
                return false
            }
            // if (board.isCheck()) {
            //     return false
            // }
            for (let i = 4; i <= 6; i++) {
                const move = {vertical: 0, horizontal: (i - 4)}
                if (board.wouldBeCheck({row, column, piece, move})) {
                    return false
                }
            }
            return true
        }

        const canCastleQueenside = (board, row, column) => {
            let checkRow, piece, side
            if (color === "white") {
                piece = "K"
                side = "Q"
                checkRow = 7
            } else {
                piece = "k"
                side = "q"
                checkRow = 0
            }
            if (!board.canCastle[side]) {
                return false
            }
            if (board.boardModel[checkRow][1] || board.boardModel[checkRow][2] || board.boardModel) {
                return false
            }
            // if (board.isCheck()) {
            //     return false
            // }
            for (let i = 4; i >= 1; i--) {
                const move = {vertical: 0, horizontal: (i - 4)}
                if (board.wouldBeCheck({row, column, piece, move})) {
                    return false
                }
            }
            return true
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
            {vertical: 0, horizontal: 2, specialConditions: canCastleKingside},
            {vertical: 0, horizontal: -3, specialConditions: canCastleQueenside}
        ]
        super(color, blackImage, whiteImage, moveSet)
    }
}

export default King