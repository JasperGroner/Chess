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

    inCheckmate() {
        const check = this.isCheck()
        if (!check) {
            return false 
            } else {
            const checkedColor = check.black ? "black" : "white"
            for (let row = 0; row < this.boardModel.length; row++) {
                for (let column = 0; column < this.boardModel.length; column++) {
                    const piece = this.boardModel[row][column]
                    if(piece &&
                        piece.color === checkedColor) {
                        for(const move of piece.moveSet) {
                            if (this.isValidMove({row, column, move, piece})) {
                                return false
                            }
                        }
                    }
                }
            }
            return true
        }
    }
}

export default ActualBoard