import Board from "./Board";


class HypotheticalBoard extends Board {
    constructor({boardModel, selectedPiece, selectedPieceLocation, selectedPieceMoves}) {
        super()
        boardModel.forEach(row => {
            this.boardModel.push(row.slice())
        })
        this.selectedPiece = selectedPiece
        this.selectedPieceLocation = selectedPieceLocation
        this.selectedPieceMoves = selectedPieceMoves
    }
}

export default HypotheticalBoard