import Board from "./Board"
import HypotheticalBoard from "./HypotheticalBoard"


class ActualBoard extends Board {
    constructor() {
        super()
        this.boardModel = Board.getDefaultBoard()
        this.turn = "white"
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
        } else if (!hypothetical && this.wouldBeCheck({row, column})) {
            console.log("invalid move!")
            return false
        }
        return true
    }

    wouldBeCheck({row, column}) {
        const hypotheticalBoard = new HypotheticalBoard(this)
        hypotheticalBoard.boardModel[row][column] = hypotheticalBoard.selectedPiece
        hypotheticalBoard.boardModel[hypotheticalBoard.selectedPieceLocation.row][hypotheticalBoard.selectedPieceLocation.column] = false
        return hypotheticalBoard.opponentCanTakeQueen()
    }
}

export default ActualBoard