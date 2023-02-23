import React, { useReducer } from "react";

const PuzzleTurnDisplay = ({puzzleLength, moveIterator, userColor, puzzleCompleted}) => {
  const currentMove = Math.floor(moveIterator / 2 + 1)
  const formattedColor = userColor.slice(0, 1).toUpperCase() + userColor.slice(1)
  let message = <>Player ({formattedColor}) Move {currentMove} of {puzzleLength}</>
  if (puzzleCompleted) {
    message = <>Puzzle Complete</>
  }
  return (
    <div className="info-display">
      <h1 className="main-heading">
        {message}
      </h1>
    </div>
  )
}

export default PuzzleTurnDisplay