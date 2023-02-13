import React from "react"
import pieceConverter from "../services/pieceConverter"

const CapturedPiecesDisplay = ({capturedPieces, color}) => {
  const capturedPiecesReact = capturedPieces.map((piece, index) => {
    return <img src={pieceConverter[piece].image} key={index} className="square"/>
  })

  return (
    <div className="captured-display">
      <h3>{color}'s captured pieces</h3>
      {capturedPiecesReact}
    </div>
  )
}

export default CapturedPiecesDisplay