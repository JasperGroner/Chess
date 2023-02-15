import React, { useEffect, useState } from "react"
import pieceConverter from "../services/pieceConverter"

const BoardTile = ({color, selectedTile, select, rowId, columnId, boardState, selectedPieceMoves, selectable}) => {

  let classes=`cell small-1.5 square square--${color}`
  
  if (selectedTile.row === rowId && selectedTile.column === columnId) {
   classes += ` square--selected`
  }

  selectedPieceMoves.forEach(move => {
    if(move.row === rowId && move.column === columnId) {
      classes += ` square--valid-move`
    }
  })

  const selectTile = async () => {
    if (selectable) {
      await select(rowId, columnId)
    }
  }
  
  let image = ""
  if (boardState.boardModel[rowId][columnId]) {
    const piece = boardState.boardModel[rowId][columnId]
    image = <img src={pieceConverter[piece].image} />
  }

  return (<div className={classes} onClick={selectTile}>
    {image}
  </div>)
}

export default BoardTile