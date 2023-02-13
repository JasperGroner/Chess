import King from "../Pieces/King"
import Decoder from "../Decoder"
import pieceConverter from "../../../services/pieceConverter"

class Board {
    constructor() {
        this.boardModel = []
        this.selectedPiece = null
        this.selectedPieceLocation = {row: null, column: null}
        this.selectedPieceMoves = []
        this.turn = ""
    }

    // method for handling user input - can turn parameter be deleted?

    handleClick(row, column, turn) {
        if (this.canMove(row, column)) {
            this.boardModel[row][column] = this.selectedPiece
            this.boardModel[this.selectedPieceLocation.row][this.selectedPieceLocation.column] = false
            this.selectedPieceLocation = {row, column}
            this.switchTurn()
            let check = this.isCheck()
            let checkmate = this.inCheckmate(check)
            this.selectedPiece = null
            return {moves: [], turnSwitch: this.turn, unselect: true, check: check, checkmate: checkmate}
        } else if (this.boardModel[row][column]) {
            const piece = this.boardModel[row][column]
            if ((this.selectedPieceLocation.row === row && 
                this.selectedPieceLocation.column === column) ||
                pieceConverter[piece].color !== turn) {
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

    // method for determining whether the selected piece can move to a given tile
    // based on selectedPieceMoves state determined on selection of piece

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

    // methods for handling switch between turns

    switchTurn () {
        this.turn = this.turn === "white" ? "black" : "white"
    }
    
    inCheckmate(check) {
        if (!check.black && !check.white) {
            return false 
            } else {
            const checkedColor = check.black ? "black" : "white"
            for (let row = 0; row < this.boardModel.length; row++) {
                for (let column = 0; column < this.boardModel.length; column++) {
                    const piece = this.boardModel[row][column]
                    if (piece && pieceConverter[piece].color === checkedColor) {
                        let moves = this.getPieceMoves(piece, row, column)
                        if (moves.length > 0)
                        {
                            return false
                        }
                    }
                }
            }
            return true
        }
    }

    // methods for getting moves for pieces

    getSelectedPieceMoves() {
        this.selectedPieceMoves = this.getPieceMoves(this.selectedPiece, this.selectedPieceLocation.row, this.selectedPieceLocation.column)
        return this.selectedPieceMoves
    }

    getPieceMoves(piece, pieceRow, pieceColumn, hypothetical) {
        const pieceMoves = []
        const moveSet = pieceConverter[piece].moveSet
        moveSet.forEach(move => {
            let row = pieceRow + move.vertical
            let column = pieceColumn + move.horizontal
            if (move.repeating) {
                while (this.isValidMove({row, column, move, piece, hypothetical})) {
                    pieceMoves.push({row, column})
                    row += move.vertical
                    column += move.horizontal
                }
            } else {
                if (this.isValidMove({row, column, move, piece, hypothetical})) {
                    pieceMoves.push({row, column})
                }
            }
        })

        return pieceMoves
    }

    // methods for determining if move is valid

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
        return true
    }

    offBoard(row, column) {
        return (row < 0 || row > this.boardModel.length -1 
            || column < 0 || column > this.boardModel[0].length - 1)
    }

    occupiedByAlly(row, column, piece) {
        const movePiece = this.boardModel[row][column]
        return (movePiece &&
            pieceConverter[movePiece].color === pieceConverter[piece].color)
    }

    occupiedByEnemy(row, column, piece) {
        const movePiece = this.boardModel[row][column]
        return (movePiece &&
            pieceConverter[movePiece].color !== pieceConverter[piece].color)
    }

    // methods for determining whether check has occurred

    isCheck() {
        const check = {black: false, white: false}
        const whiteKingLocation = this.getKingLocation("white")
        const blackKingLocation = this.getKingLocation("black")
        for (let i = 0; i < this.boardModel.length; i++) {
            for (let j = 0; j < this.boardModel.length; j++) { 
                // maybe make "getAllPieces" function to handle this
                let piece = this.boardModel[i][j]
                if (piece) {
                    const validMoves = this.getPieceMoves(piece, i, j, true)
                    validMoves.forEach(move => {
                        if (pieceConverter[piece].color === "white" && 
                            move.row === blackKingLocation.row &&
                            move.column === blackKingLocation.column) {
                            check.black = true
                        }
                        else if (pieceConverter[piece].color === "black" &&
                            move.row === whiteKingLocation.row &&
                            move.column === whiteKingLocation.column) {
                            check.white = true
                        }
                    })
                }

            }
        }
        return check
    }

    getKingLocation(color) {
        for (let i = 0; i < this.boardModel.length; i++) {
            for (let j = 0; j < this.boardModel[i].length; j++) {
                const piece = this.boardModel[i][j]
                if (pieceConverter[piece] instanceof King &&
                    pieceConverter[piece].color === color) {
                    return({row: i, column: j})
                }
            }
        } 
    }

    // method for getting default board

    static getDefaultBoard() {
        const defaultBoardStr = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
        const defaultBoard = Decoder.decodeBoard(defaultBoardStr)
        return defaultBoard
    }

    static createBlankBoard() {
        const blankBoard = []
        for(let i = 0; i < 8; i++) {
            blankBoard.push(new Array(8))
        }
    }
}

export default Board