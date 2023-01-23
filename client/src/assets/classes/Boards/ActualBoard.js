import Board from "./Board"
import HypotheticalBoard from "./HypotheticalBoard"


class ActualBoard extends Board {
    constructor() {
        super()
        this.boardModel = Board.getDefaultBoard()
        this.turn = "white"
    }


    handleClick(row, column, turn) {
        if (this.canMove(row, column)) {
            this.boardModel[row][column] = this.selectedPiece
            this.boardModel[this.selectedPieceLocation.row][this.selectedPieceLocation.column] = false
            this.selectedPieceLocation = {row, column}
            let check = this.switchTurn()
            this.selectedPiece = null
            return {moves: [], turnSwitch: this.turn, unselect: true, check: check}
        } else if (this.boardModel[row][column]) {
            if ((this.selectedPieceLocation.row === row && 
                this.selectedPieceLocation.column === column) ||
                this.boardModel[row][column].color !== turn) {
                this.selectedPiece = null
                this.selectedPieceLocation = {}
                return {moves: []}
            } else {
                this.selectedPiece = this.boardModel[row][column]
                this.selectedPieceLocation = {row, column}
                return {moves: this.getSelectedPieceMoves()}
            }
        }
        return {moves: []}
    }

    canMove(row, column) {
        if (this.selectedPiece) {
            for (const move of this.selectedPieceMoves) {
                if (move.row === row && move.column === column) {
                    return true
                }
            }
        }
        return false
    }

    switchTurn () {
        this.turn = this.turn === "white" ? "black" : "white"
        return this.isCheck()
    }

    isValidMove({row, column, move, piece}) {
        if (this.offBoard(row, column)) {
            return false
        } else if (this.occupiedByAlly(row, column, piece)) {
            return false
        } else if (this.occupiedByEnemy(row - move.vertical, column - move.horizontal, piece)) {
            return false
        } else if (move.specialConditions && !move.specialConditions(this.boardModel, row, column)) {
            return false
        } 
        // else if (this.wouldBeCheck({row, column})) {
        //     return false
        // }
        return true
    }

    
    wouldBeCheck({row, column}) {
        const hypotheticalBoard = new HypotheticalBoard(this)
        hypotheticalBoard.boardModel[row][column] = hypotheticalBoard.selectedPiece
        hypotheticalBoard.boardModel[hypotheticalBoard.selectedPieceLocation.row][hypotheticalBoard.selectedPieceLocation.column] = false
        console.log(hypotheticalBoard.isCheck())
        return !hypotheticalBoard.isCheck()
    }
}

export default ActualBoard