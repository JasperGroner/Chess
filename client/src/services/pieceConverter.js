import Bishop from "../assets/classes/Pieces/Bishop"
import King from "../assets/classes/Pieces/King"
import Knight from "../assets/classes/Pieces/Knight"
import Pawn from "../assets/classes/Pieces/Pawn"
import Queen from "../assets/classes/Pieces/Queen"
import Rook from "../assets/classes/Pieces/Rook"

const pieceConverter = {
  b: new Bishop("black"),
  B: new Bishop("white"),
  k: new King("black"),
  K: new King("white"),
  n: new Knight("black"),
  N: new Knight("white"),
  p: new Pawn("black"),
  P: new Pawn("white"),
  q: new Queen("black"),
  Q: new Queen("white"),
  r: new Rook("black"),
  R: new Rook("white")
}

export default pieceConverter