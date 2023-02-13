class Decoder {
  static decodeBoard(encodedString) {
    const board = []
    const encodedArray = encodedString.split(" ")
    const encodedBoard = encodedArray[0].split("/")
    for (let i = 0; i < encodedBoard.length; i++) {
      board.push([])
      for (let j = 0; j < encodedBoard[i].length; j++) {
        let character = encodedBoard[i][j]
        if (isNaN(character)) {
          board[i].push(character)
        } else {
          for (let k = 0; k < character; k++) {
            board[i].push(null)
          }
        }
      }
    }
    return board
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