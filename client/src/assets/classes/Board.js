import React from "react"
import Bishop from "./Pieces/Bishop"
import King from "./Pieces/King"
import Knight from "./Pieces/Knight"
import Pawn from "./Pieces/Pawn"
import Queen from "./Pieces/Queen"
import Rook from "./Pieces/Rook"

class Board {
    constructor() {
        this.boardModel = []
        this.selectedPiece = null
        this.selectedPieceLocation = {row: null, column: null}
        this.populateBoard()
    }

    populateBoard() {
        for (let i = 0; i < 8; i++) {
            let row = []
            if (i === 0) {
                row = Board.convertRow(["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"])
            } else if (i === 7) {
                row = Board.convertRow(["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"])
            } else {
                for (let j = 0; j < 8; j++) {
                    if (i === 1) row.push(new Pawn("black"))
                    else if (i === 6) row.push(new Pawn("white"))
                    else row.push(false)
                }
            }
            this.boardModel.push(row)
        }
    }

    select(row, column) {
        if (this.boardModel[row][column]) {
            if (this.selectedPieceLocation.row === row && 
                this.selectedPieceLocation.column === column) {
                this.selectedPiece = null
                this.selectedPieceLocation = {}
                return []
            } else {
                this.selectedPiece = this.boardModel[row][column]
                this.selectedPieceLocation = {row, column}
                return this.getSelectedPieceMoves()
            }
        }
        return []
    }

    getSelectedPieceMoves() {
        const validMovesLocations = []
        const moveSet = this.selectedPiece.moveSet
        moveSet.forEach(move => {
            if (move.repeating) {
                let row = this.selectedPieceLocation.row + move.vertical
                let column = this.selectedPieceLocation.column + move.horizontal
                while (this.isValidMove(row, column)) {
                    validMovesLocations.push({row, column})
                    row += move.vertical
                    column += move.horizontal
                }
            } else {
                const row = this.selectedPieceLocation.row + move.vertical
                const column = this.selectedPieceLocation.column + move.horizontal  
                const moveLocation = {row, column}
                if (this.isValidMove(row, column)) {
                    validMovesLocations.push(moveLocation)
                }
            }
        })
        return validMovesLocations
    }

    isValidMove(row, column) {
        if (this.offBoard(row, column)) {
            return false
        } else if (this.occupiedByAlly(row, column)) {
            return false
        }
        return true
    }

    offBoard(row, column) {
        return (row < 0 || row > this.boardModel.length -1 
            || column < 0 || column > this.boardModel[0].length - 1)
    }

    occupiedByAlly(row, column) {
        return (this.boardModel[row][column] &&
            this.boardModel[row][column].color === this.selectedPiece.color)
    }

    static convertRow(rowArray) {
        for (let i =0; i < rowArray.length; i++) {
            rowArray[i] = Board.convertPiece(rowArray[i])
        }
        return rowArray
    }

    static convertPiece(name) {
        switch(name) {
            case "wb":
                return new Bishop("white")
            case "bb":
                return new Bishop("black")
            case "wk":
                return new King("white")
            case "bk":
                return new King("black")
            case "wn":
                return new Knight("white")
            case "bn":
                return new Knight("black")
            case "wp":
                return new Pawn("white")
            case "bp":
                return new Pawn("black")
            case "wq":
                return new Queen("white")
            case "bq":
                return new Queen("black")
            case "wr":
                return new Rook("white")
            case "br":
                return new Rook('black')
        }
    }
}

export default Board