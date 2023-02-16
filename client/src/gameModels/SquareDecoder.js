class SquareDecoder {
  static encodeSquare(row, column) {
    let encodedSquare = ""
    encodedSquare += String.fromCharCode(97 + column)
    encodedSquare += (8 - row).toString()
    return encodedSquare
  }

  static decodeSquare(encodedSquare) {
    let decodedSquare = {}
    const columnLetter = encodedSquare[0].toLowerCase()
    decodedSquare.column = columnLetter.charCodeAt(0) - 97
    decodedSquare.row = 8 - encodedSquare[1]
    return decodedSquare
  }
}

export default SquareDecoder