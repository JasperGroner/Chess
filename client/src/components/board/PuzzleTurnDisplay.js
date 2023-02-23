import React, { useReducer } from "react";

const PuzzleTurnDisplay = ({puzzleLength, moveIterator, userColor}) => {
  const currentMove = Math.floor(moveIterator / 2 + 1)
  const formattedColor = userColor.slice(0, 1).toUpperCase() + userColor.slice(1)
  return (
    <div className="info-display">
      <h1 className="main-heading">
        Player ({formattedColor}) Move {currentMove} of {puzzleLength}
      </h1>
    </div>
  )
}

export default PuzzleTurnDisplay