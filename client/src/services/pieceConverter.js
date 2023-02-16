import Bishop from "../gameModels/Pieces/Bishop"
import King from "../gameModels/Pieces/King"
import Knight from "../gameModels/Pieces/Knight"
import Pawn from "../gameModels/Pieces/Pawn"
import Queen from "../gameModels/Pieces/Queen"
import Rook from "../gameModels/Pieces/Rook"

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