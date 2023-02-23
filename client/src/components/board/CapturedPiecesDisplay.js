import React from "react"
import pieceConverter from "../../services/pieceConverter"

const CapturedPiecesDisplay = ({capturedPieces, color}) => {
  const capturedPiecesReact = capturedPieces.map((piece, index) => {
    return (
      <div className="square" key={index}>
        <img src={pieceConverter[piece].image} className="piece-image"/>
      </div>
    )
  })

  return (
    <div className="captured-display">
      <h2 className="sub-heading">Captured By {color}</h2>
      <div className="pieces-display">
        {capturedPiecesReact}
      </div>
    </div>
  )
}

export default CapturedPiecesDisplay