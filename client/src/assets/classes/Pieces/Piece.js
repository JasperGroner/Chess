import Move from "../Move"

class Piece {
    constructor(color, blackImage, whiteImage, moveSet) {
        this.color = color
        this.setImage(blackImage, whiteImage)
        this.moveSet = []
        if (moveSet) {
            moveSet.forEach(move => {
                this.moveSet.push(new Move(move))
            })
        }
    }

    setImage(blackImage, whiteImage) {
        if (this.color === "black") {
            this.image = blackImage
        } else {
            this.image = whiteImage
        }
    }
    
    // move this to board?
    // makes sense given board data is already there
    getValidMoves(board, location) {
        const validMovesLocations = []
        this.moveSet.forEach(move => {
            if (move.repeating) {
                let row = location.row + move.vertical
                let column = location.column + move.horizontal
                while (board.onBoard(row, column)) {
                    validMovesLocations.push({row, column})
                    row += move.vertical
                    column += move.horizontal
                }
            } else {
                const row = location.row + move.vertical
                const column = location.column + move.horizontal  
                const moveLocation = {row, column}
                if (board.onBoard(row, column)) {
                    validMovesLocations.push(moveLocation)
                }
            }
        })
        return validMovesLocations
    }
}

export default Piece