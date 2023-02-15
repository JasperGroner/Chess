import Piece from "./Piece"
import blackImage from "../../images/pawn-black.png"
import whiteImage from "../../images/pawn-white.png"


class Pawn extends Piece {
    constructor(color) {
        const isWhiteAndNoEnemy = (board, row, column) => {
            return (this.color === "white" &&
                !board.boardModel[row][column])
        }
        const isBlackAndNoEnemy = (board, row, column) => {
            return(this.color === "black" &&
                !board.boardModel[row][column])
        }
        const isWhiteAndEnemy = (board, row, column) => {
            return(this.color === "white" &&
                board.boardModel[row][column])
        }
        const isBlackAndEnemy = (board, row, column) => {
            return(this.color === "black" &&
                board.boardModel[row][column])
        }
        const whiteInitialPlaceAndNoEnemy = (board, row, column) => {
            return(this.color === "white" &&
                row === board.boardModel.length - 4 &&
                !board.boardModel[row][column] &&
                !board.boardModel[row + 1][column])
        }
        const blackInitialPlaceAndNoEnemy = (board, row, column) => {
            return(this.color === "black" &&
            row === 3 &&
            !board.boardModel[row][column] &&
            !board.boardModel[row - 1][column])
        }
        const moveSet = [
            {vertical: 1, horizontal: 0, specialConditions: isBlackAndNoEnemy},
            {vertical: 1, horizontal: -1, specialConditions: isBlackAndEnemy},
            {vertical: 1, horizontal: 1, specialConditions: isBlackAndEnemy},
            {vertical: 2, horizontal: 0, specialConditions: blackInitialPlaceAndNoEnemy},
            {vertical: -1, horizontal: 0, specialConditions: isWhiteAndNoEnemy},
            {vertical: -1, horizontal: -1, specialConditions: isWhiteAndEnemy},
            {vertical: -1, horizontal: 1, specialConditions: isWhiteAndEnemy},
            {vertical: -2, horizontal: 0, specialConditions: whiteInitialPlaceAndNoEnemy}
        ]
        super(color, blackImage, whiteImage, moveSet)
    }
}

export default Pawn