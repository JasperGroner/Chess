class Decoder {
  static decodeGame(encodedGame) {
    const game = {
      board: [],
      turn: "",
      canCastle: {
        whiteKingSide: false,
        whiteQueenSide: false,
        blackKingSide: false,
        blackQueenSide: false
      }
    }
    const encodedGameArray = encodedGame.split(" ")
    game.board = Decoder.decodeBoard(encodedGameArray[0])
    game.turn = encodedGameArray[1] === "w" ? "white" : "black"
    if (encodedGameArray[2].includes("K")) {
      game.canCastle.whiteKingSide = true
    }
    if (encodedGameArray[2].includes("Q")) {
      game.canCastle.whiteQueenSide = true
    }
    if (encodedGameArray[2].includes("k")) {
      game.canCastle.blackKingSide = true
    }
    if (encodedGameArray[2].includes("q")) {
      game.canCastle.blackQueenSide = true
    }
    game.enPassantSquare = encodedGameArray[3] === "-" ? 
      null : encodedGameArray[3]
    game.halfmoveClock = encodedGameArray[4]
    game.fullmoves = encodedGameArray[5]
    return game
  }

  static decodeBoard(encodedBoard) {
    const board = []
    const encodedBoardArray = encodedBoard.split("/")
    for (let i = 0; i < encodedBoardArray.length; i++) {
      board.push([])
      for (let j = 0; j < encodedBoardArray[i].length; j++) {
        let character = encodedBoardArray[i][j]
        if (isNaN(character)) {
          board[i].push(character)
        } else {
          for (let k = 0; k < character; k++) {
            board[i].push(false)
          }
        }
      }
    }
    return board
  }

  static encodeGame(game) {
    let encodedString = this.encodeBoard(game.boardModel)
    encodedString += game.turn === "white" ? " w " : " b "
    if (game.canCastle.whiteKingSide) {
      encodedString += "K"
    }
    if (game.canCastle.whiteQueenSide) {
      encodedString += "Q"
    }
    if (game.canCastle.blackKingSide) {
      encodedString += "k"
    }
    if (game.canCastle.whiteQueenSide) {
      encodedString += "q"
    }
    if (encodedString[encodedString.length - 1] === " ") {
      encodedString += "-"
    }
    encodedString += game.enPassantSquare ? ` ${game.enPassantSquare}` : " -"
    encodedString += ` ${game.halfmoveClock}`
    encodedString += ` ${game.fullmoves}`
    return encodedString
  }

  static encodeBoard(board) {
    let encodedString = ""
    for (let i = 0; i < board.length; i++) {
      let spaces = 0;
      for (let j = 0; j < board[i].length; j++) {
        let square = board[i][j]
        if (isNaN(square)) {
          if (spaces > 0) {
            encodedString += spaces
          }
          encodedString += square
          spaces = 0
        } else {
          spaces++
        }
      }
      if (spaces > 0) {
        encodedString += spaces
      }
      if (i < board.length - 1) {
        encodedString += "/"
      }
    }
    return encodedString
  }
}

export default Decoder