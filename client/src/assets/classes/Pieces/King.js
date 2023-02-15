import Piece from "./Piece"
import blackImage from "../../images/king-black.png"
import whiteImage from "../../images/king-white.png"

class King extends Piece {
    constructor(color) {
        const canCastleKingside = ({board, row}) => {
            let piece
            if (color === "white") {
                piece = "K"
            } else {
                piece = "k"
            }
            if (!board.canCastle[piece]) {
                return false
            }
            if (board.boardModel[row][5] || board.boardModel[row][6]) {
                return false
            }
            if (!board.hypothetical) {
                const check = board.isCheck()
                if (check.black || check.white) {
                    return false
                }
            }
            for (let i = 5; i <= 6; i++) {
                const move = {vertical: 0, horizontal: (i - 4)}
                if (!(board.wouldNotBeCheck({row, column: i, piece, move}))) {
                    return false
                }
            }
            return true
        }

        const canCastleQueenside = ({board, row}) => {
            let piece, side
            if (color === "white") {
                piece = "K"
                side = "Q"
            } else {
                piece = "k"
                side = "q"
            }
            if (!board.canCastle[side]) {
                return false
            }
            if (board.boardModel[row][1] || board.boardModel[row][2] || board.boardModel[row][3]) {
                return false
            }
            if (!board.hypothetical) {
                const check = board.isCheck()
                if (check.black || check.white) {
                    return false
                }
            }
            for (let i = 3; i >= 2; i--) {
                const move = {vertical: 0, horizontal: (i - 4)}
                if (!(board.wouldNotBeCheck({row, column: i, piece, move}))) {
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
            {vertical: 0, horizontal: -2, specialConditions: canCastleQueenside}
        ]
        super(color, blackImage, whiteImage, moveSet)
    }
}

export default King