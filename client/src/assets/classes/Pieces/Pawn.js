import Piece from "./Piece"
import blackImage from "../../images/pawn-black.png"
import whiteImage from "../../images/pawn-white.png"
import SquareDecoder from "../SquareDecoder"

class Pawn extends Piece {
  constructor(color) {

    const isWhiteAndNoEnemy = ({board, row, column}) => {
      return (this.color === "white" &&
        !board.boardModel[row][column])
    }

    const isBlackAndNoEnemy = ({board, row, column}) => {
      return(this.color === "black" &&
        !board.boardModel[row][column])
    }

    const isWhiteAndEnemyOrEnPassant = ({board, row, column}) => {
      if (this.color === "white") {
        if (board.boardModel[row][column]) {
          return true
        } 
        if (board.enPassantSquare) {
          const decodedEnPassantSquare = SquareDecoder.decodeSquare(board.enPassantSquare)
          if (decodedEnPassantSquare.row === row && decodedEnPassantSquare.column === column) {
            return true
          }
        }
      }
      return false
    }

    const isBlackAndEnemyOrEnPassant = ({board, row, column}) => {
      if (this.color === "black") {
        if (board.boardModel[row][column]) {
          return true
        } 
        if (board.enPassantSquare) {
          const decodedEnPassantSquare = SquareDecoder.decodeSquare(board.enPassantSquare)
          if (decodedEnPassantSquare.row === row && decodedEnPassantSquare.column === column) {
            return true
          }
        }
      }
      return false
    }

    const whiteInitialPlaceAndNoEnemy = ({board, row, column}) => {
      return (this.color === "white" &&
        row === board.boardModel.length - 4 &&
        !board.boardModel[row][column] &&
        !board.boardModel[row + 1][column])
    }

    const blackInitialPlaceAndNoEnemy = ({board, row, column}) => {
      return (this.color === "black" &&
        row === 3 &&
        !board.boardModel[row][column] &&
        !board.boardModel[row - 1][column])
    }

    const moveSet = [
      {vertical: 1, horizontal: 0, specialConditions: isBlackAndNoEnemy},
      {vertical: 1, horizontal: -1, specialConditions: isBlackAndEnemyOrEnPassant},
      {vertical: 1, horizontal: 1, specialConditions: isBlackAndEnemyOrEnPassant},
      {vertical: 2, horizontal: 0, specialConditions: blackInitialPlaceAndNoEnemy},
      {vertical: -1, horizontal: 0, specialConditions: isWhiteAndNoEnemy},
      {vertical: -1, horizontal: -1, specialConditions: isWhiteAndEnemyOrEnPassant},
      {vertical: -1, horizontal: 1, specialConditions: isWhiteAndEnemyOrEnPassant},
      {vertical: -2, horizontal: 0, specialConditions: whiteInitialPlaceAndNoEnemy}
    ]
    super(color, blackImage, whiteImage, moveSet)
  }
}

export default Pawn