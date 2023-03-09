import King from "./Pieces/King"
import GameDecoder from "./GameDecoder"
import pieceConverter from "../services/pieceConverter"
import SquareDecoder from "./SquareDecoder"
import MoveDecoder from "./MoveDecoder"

class Chess {
  constructor({gameState, selectedPiece, selectedPieceLocation, selectedPieceMoves, hypothetical, blankBoard}) {
    if (blankBoard) {
      this.loadGame(Chess.blankBoard, blankBoard)
    } else if (!gameState) {
      this.loadGame(Chess.defaultBoard)
    } else {
      this.loadGame(gameState)
    }
    this.selectedPiece = selectedPiece
    this.selectedPieceLocation = selectedPieceLocation ? selectedPieceLocation : {row: null, column: null}
    this.selectedPieceMoves = selectedPieceMoves ? selectedPieceMoves : []
    this.hypothetical = hypothetical
  }
  
  // method for loading board

  loadGame(encodedGame, blankBoard) {
    const game = GameDecoder.decodeGame(encodedGame)
    this.boardModel = game.board
    this.turn = game.turn
    this.canCastle = game.canCastle
    this.enPassantSquare = game.enPassantSquare
    this.halfmoveClock = game.halfmoveClock
    this.fullmoves = game.fullmoves
    if (!blankBoard) {
      this.capturedPieces = game.capturedPieces
    } else {
      this.capturedPieces = {white: [], black: []}
    }
  }  

  // method for handling user input

  handleClick(row, column) {
    if (this.canMove(row, column)) {
      const pawnUpgrade = this.isPawnUpgrade(row, column)
      if (pawnUpgrade) {
        if (this.isPuzzle) {
          this.pawnUpgraded = true
          this.priorPawnLocation = {
            row: this.selectedPieceLocation.row,
            column: this.selectedPieceLocation.column
          }
          this.priorPawnDestinationPiece = this.boardModel[row][column]
        }
        return { pawnUpgrade, moves: [] }
      }
      return this.handleMove(row, column)
    } else if (this.boardModel[row][column]) {
      const piece = this.boardModel[row][column]
      if ((this.selectedPieceLocation.row === row && 
        this.selectedPieceLocation.column === column) ||
        pieceConverter[piece].color !== this.turn) {
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

  handleMove(row, column) {
    if (this.isPuzzle) {
      const wrongMove = this.isWrongMove(row, column)
      if (wrongMove) {
        this.selectedPiece = null
        this.selectedPieceLocation = {row: null, column: null}
        return { wrongMove: true, moves: []}
      }
    }
    this.updateCapturedPieces(this.boardModel[row][column])
    this.enPassantCapture(row, column)
    this.boardModel[row][column] = this.selectedPiece
    this.boardModel[this.selectedPieceLocation.row][this.selectedPieceLocation.column] = false
    this.moveRookIfCastled(column)
    this.updateCastling()
    this.updateEnPassant(row, column)
    this.switchTurn()
    const check = this.isCheck()
    const checkmate = this.inCheckmate(check)
    const encodedState = GameDecoder.encodeGame(this)
    this.selectedPiece = null
    this.selectedPieceLocation = {}
    this.selectedPieceMoves = []
    if (this.isPuzzle && this.moveIterator % 2 === 1) {
      this.moveIterator++
    }
    return {moves: [], turnSwitch: this.turn, unselect: true, check, checkmate, capturedPieces: this.capturedPieces, encodedState}
  }

  updateCapturedPieces(pieceAtMoveLocation) {
    if (pieceAtMoveLocation) {
      if (pieceConverter[pieceAtMoveLocation].color === "white") {
        this.capturedPieces.white.push(pieceAtMoveLocation)
      } else {
        this.capturedPieces.black.push(pieceAtMoveLocation)
      }
      this.halfmoveClock = 0
    } else {
      this.halfmoveClock++
    }
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
    if (this.turn === "white") {
      this.fullmoves++
    }
  }
  
  // methods for getting moves for pieces

  getSelectedPieceMoves() {
    this.selectedPieceMoves = this.getPieceMoves(this.selectedPiece, this.selectedPieceLocation.row, this.selectedPieceLocation.column)
    return this.selectedPieceMoves
  }

  getPieceMoves(piece, pieceRow, pieceColumn) {
    const pieceMoves = []
    const moveSet = pieceConverter[piece].moveSet
    moveSet.forEach(move => {
      let row = pieceRow + move.vertical
      let column = pieceColumn + move.horizontal
      if (move.repeating) {
        while (this.isValidMove({row, column, move, piece})) {
          if (this.wouldNotBeCheck({row, column, move, piece, pieceRow, pieceColumn})) {
            pieceMoves.push({row, column})
          }
          row += move.vertical
          column += move.horizontal
        }
      } else {
        if (this.isValidMove({row, column, move, piece}) && 
          this.wouldNotBeCheck({row, column, move, piece, pieceRow, pieceColumn})) {
          pieceMoves.push({row, column})
        }
      }
    })

    return pieceMoves
  }

  // methods for determining if move is valid

  isValidMove({row, column, move, piece }) {
    if (this.offBoard(row, column)) {
      return false
    } else if (this.occupiedByAlly(row, column, piece)) {
      return false
    } else if (this.occupiedByEnemy(row - move.vertical, column - move.horizontal, piece)) {
      return false
    } else if (move.specialConditions && !move.specialConditions({board: this, row, column})) {
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
    this.hypothetical = true
    for (let i = 0; i < this.boardModel.length; i++) {
      for (let j = 0; j < this.boardModel.length; j++) {
        let piece = this.boardModel[i][j]
        if (piece) {
          const validMoves = this.getPieceMoves(piece, i, j)
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
    this.hypothetical = false
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

  // methods for determining whether move would put you in check

  wouldNotBeCheck({row, column, piece, pieceRow, pieceColumn}) {
    if (this.hypothetical) {
      return true
    }
    const hypotheticalBoard = new Chess({gameState: GameDecoder.encodeGame(this), selectedPiece: this.selectedPiece, selectedPieceLocation: this.selectedPieceLocation, selectedPieceMoves: this.selectedPieceMoves, hypothetical: true})
    hypotheticalBoard.boardModel[row][column] = piece
    hypotheticalBoard.boardModel[pieceRow][pieceColumn] = false
    return !hypotheticalBoard.opponentCanTakeKing()
  }

  opponentCanTakeKing() {
    const kingLocation = this.getKingLocation(this.turn)
    if (!kingLocation) return true
    const pieceColor = this.turn === "white" ? "black" : "white"
    for (let i = 0; i < this.boardModel.length; i++) {
      for (let j = 0; j < this.boardModel.length; j++) { 
        let piece = this.boardModel[i][j]
        if (piece && pieceConverter[piece].color === pieceColor) {
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

  // checkmate method

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

  // castling methods

  updateCastling() {
    if (this.selectedPiece === "K" && (this.canCastle["K"] === true || this.canCastle["Q"] === true)) {
      this.canCastle["K"] = false
      this.canCastle["Q"] = false
    } else if (this.selectedPiece === "k" && (this.canCastle["k"] === true || this.canCastle["q"] === true)) {
      this.canCastle["k"] = false
      this.canCastle["q"] = false
    } else if (this.selectedPiece === "R") {
      if (this.canCastle["Q"] && 
        this.selectedPieceLocation.column === 0) {
          this.canCastle["Q"] = false
      } else if (this.canCastle["K"] && 
        this.selectedPieceLocation.column === 7) {
          this.canCastle["K"] = false
      }
    } else if (this.selectedPiece === "r") {
      if (this.canCastle["q"] && 
        this.selectedPieceLocation.column === 0) {
          this.canCastle["q"] = false
      } else if (this.canCastle["k"] && 
        this.selectedPieceLocation.column === 7) {
          this.canCastle["k"] = false
      }
    }
  }

  moveRookIfCastled(column) {
    if (this.selectedPiece === "k" &&
      this.selectedPieceLocation.row === 0 &&
      this.selectedPieceLocation.column === 4) {
      if (column === 6) {
        this.boardModel[0][7] = false
        this.boardModel[0][5] = "r"
      } else if (column === 2) {
        this.boardModel[0][0] = false
        this.boardModel[0][3] = "r"
      }
    } else if (this.selectedPiece === "K" &&
      this.selectedPieceLocation.row === 7 &&
      this.selectedPieceLocation.column === 4) {
      if (column === 6) {
        this.boardModel[7][7] = false
        this.boardModel[7][5] = "R"
      } else if (column === 2) {
        this.boardModel[7][0] = false
        this.boardModel[7][3] = "R"
      }
    }
  }

  // pawn upgrade methods

  isPawnUpgrade(row, column) {
    if (this.selectedPiece === "P" && row === 0) {
      return { display: true, turn: "white", row, column }
    } else if (this.selectedPiece === "p" && row === 7) {
      return { display: true, turn: "black", row, column }
    }
    return false
  }

  upgradePawn(piece) {
    this.selectedPiece = piece
  }

  // en passant update method

  enPassantCapture(row, column) {
    if (!this.enPassantSquare) {
      return false
    }
    const decodedEnPassantSquare = SquareDecoder.decodeSquare(this.enPassantSquare)
    if (["P", "p"].includes(this.selectedPiece) && 
      decodedEnPassantSquare.row === row &&
      decodedEnPassantSquare.column === column) {
        if (this.selectedPiece === "p") {
          this.capturedPieces.white.push(this.boardModel[row - 1][column])
          this.boardModel[row - 1][column] = false
        } else {
          this.capturedPieces.black.push(this.boardModel[row + 1][column])
          this.boardModel[row + 1][column] = false 
        }
    }
  }

  updateEnPassant(row, column) {
    if (this.selectedPiece === "p" && 
      this.selectedPieceLocation.row === 1 &&
      row === 3) {
        this.enPassantSquare = SquareDecoder.encodeSquare(2, column)
    } else if (this.selectedPiece === "P" &&
      this.selectedPieceLocation.row === 6 &&
      row === 4) {
        this.enPassantSquare = SquareDecoder.encodeSquare(5, column)
    } else {
      this.enPassantSquare = null
    }
  }

  // puzzle moves

  setUpPuzzle(moves) {
    this.isPuzzle = true
    this.puzzleMoves = moves.sort((a, b) => {
      return a.moveNumber - b.moveNumber
    })
    this.puzzleLength = moves.length / 2
    this.moveIterator = 0
  }

  async computerMove(selectFunction, handleResposeFunction, userColor) {
    if (this.moveIterator >= this.puzzleMoves.length) {
      return "completed"
    }

    const decodedMove = MoveDecoder.decodeMove(this.puzzleMoves[this.moveIterator])
    
    selectFunction(decodedMove.moveStart.row, decodedMove.moveStart.column)

    await new Promise(resolve => setTimeout(resolve, 500));

    selectFunction(decodedMove.moveEnd.row, decodedMove.moveEnd.column)

    if (decodedMove.pawnUpgrade) {
      const upgradedPiece = userColor === "black" ? 
        decodedMove.pawnUpgrade.toUpperCase() : decodedMove.pawnUpgrade.toLowerCase()
      this.upgradePawn(decodedMove.pawnUpgrade)
      const response = this.handleMove(decodedMove.moveEnd.row, decodedMove.moveEnd.column)
      handleResposeFunction(response)
    }

    this.moveIterator += 1
  }

  isWrongMove(row, column) {
    const decodedMove = MoveDecoder.decodeMove(this.puzzleMoves[this.moveIterator])
    if (decodedMove.pawnUpgrade) {
      if (decodedMove.moveEnd.row !== row ||
            decodedMove.moveEnd.column !== column ||
            this.boardModel[row][column] && this.boardModel[row][column].toLowerCase() !== decodedMove.pawnUpgrade.toLowerCase() ||
            !this.pawnUpgraded) {
        this.boardModel[row][column] = this.priorPawnDestinationPiece
        this.boardModel[this.priorPawnLocation.row][this.priorPawnLocation.column] = this.turn === "white" ? "P" : "p"
        this.pawnUpgraded = false
        return true
      }
      this.pawnUpgraded = false
      return false
    }
    return (decodedMove.moveStart.row !== this.selectedPieceLocation.row ||
            decodedMove.moveStart.column !== this.selectedPieceLocation.column ||
            decodedMove.moveEnd.row !== row ||
            decodedMove.moveEnd.column !== column)
  }

  // method for getting default board

  static get defaultBoard() {
    const defaultBoardStr = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    return defaultBoardStr
  }

  static get blankBoard() {
    const blankBoardStr = "8/8/8/8/8/8/8/8 w KQkq - 0 1"
    return blankBoardStr
  }
}

export default Chess