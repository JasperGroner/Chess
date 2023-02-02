import Board from "./Board";


class HypotheticalBoard extends Board {
    constructor({boardModel, selectedPiece, selectedPieceLocation, selectedPieceMoves, turn}) {
        super()
        boardModel.forEach(row => {
            this.boardModel.push(row.slice())
        })
        this.selectedPiece = selectedPiece
        this.selectedPieceLocation = selectedPieceLocation
        this.selectedPieceMoves = selectedPieceMoves
        this.turn = turn
    }

    opponentCanTakeKing() {
        const kingLocation = this.getKingLocation(this.turn)
        if (!kingLocation) return true
        const pieceColor = this.turn === "white" ? "black" : "white"
        for (let i = 0; i < this.boardModel.length; i++) {
            for (let j = 0; j < this.boardModel.length; j++) { 
                // maybe make "getAllPieces" function to handle this
                let piece = this.boardModel[i][j]
                if (piece && piece.color === pieceColor) {
                    const validMoves = this.getPieceMoves(piece, i, j)
                    for (const move of validMoves) {
                        if (move.row === kingLocation.row &&
                            move.column === kingLocation.column) {
                            return true
                        }
                    }
                }

            }
        }
        return false
    }
}

export default HypotheticalBoard