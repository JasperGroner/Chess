import Board from "./Board"
import HypotheticalBoard from "./HypotheticalBoard"


class ActualBoard extends Board {
    constructor() {
        super()
        this.loadGame(Board.defaultBoard)
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
            return false
        }
        return true
    }

    wouldBeCheck({row, column, piece, move}) {
        const hypotheticalBoard = new HypotheticalBoard(this)
        hypotheticalBoard.boardModel[row][column] = piece
        hypotheticalBoard.boardModel[row - move.vertical][column - move.horizontal] = false
        return hypotheticalBoard.opponentCanTakeKing()
    }
}

export default ActualBoard