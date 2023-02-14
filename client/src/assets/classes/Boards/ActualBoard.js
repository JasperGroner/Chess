import Board from "./Board"
import Decoder from "../Decoder"

class ActualBoard extends Board {
    constructor(gameState) {
        super(gameState)
    }

    isValidMove({row, column, move, piece, hypothetical}) {
        if (this.offBoard(row, column)) {
            return false
        } else if (this.occupiedByAlly(row, column, piece)) {
            return false
        } else if (this.occupiedByEnemy(row - move.vertical, column - move.horizontal, piece)) {
            return false
        } else if (move.specialConditions && !move.specialConditions(this.boardModel, row, column)) {
            return false
        } else if (!hypothetical && this.wouldBeCheck({row, column, piece, move})) {
            return false // need to update to not break chain of repeating piece moves
        }
        return true
    }

    wouldBeCheck({row, column, piece, move}) {
        const hypotheticalBoard = new Board(Decoder.encodeGame(this))
        hypotheticalBoard.boardModel[row][column] = piece
        hypotheticalBoard.boardModel[row - move.vertical][column - move.horizontal] = false
        return hypotheticalBoard.opponentCanTakeKing()
    }
}

export default ActualBoard