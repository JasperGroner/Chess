import React from "react"
import BoardTile from "./BoardTile"

const BoardRow = ( {firstTile, rowId, selectedTile, select, boardState, selectedPieceMoves, selectable, userColor} ) => {
  let squareColors = []
  if (firstTile === "light") {
    squareColors = ["light", "dark"]
  } else {
    squareColors = ["dark", "light"]
  }

  const setUpRow = () => {
    const row = []
    for (let i = 0; i < 8; i++) {
      let color = squareColors[i % 2]
      row.push(
        <BoardTile 
          color={color} 
          key={i}
          columnId={userColor === "black" ? 7 - i : i}
          rowId={rowId}
          boardState={boardState}
          selectedTile={selectedTile}
          select={select}
          selectable={selectable}
          selectedPieceMoves={selectedPieceMoves}
        />
      )
    }
    return row
  }

  const row = setUpRow()

  return <div className="row grid-x">{row}</div>
}

export default BoardRow