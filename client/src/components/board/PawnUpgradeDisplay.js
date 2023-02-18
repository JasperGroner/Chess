import React, { useState } from "react";
import pieceConverter from "../../services/pieceConverter"

const PawnUpgradeDisplay = ({pawnUpgrade, selfDestruct, boardState, handleResponse, setPawnUpgrade}) => {

  const upgrade = event => {
    event.preventDefault()
    boardState.upgradePawn(event.currentTarget.id)
    const response = boardState.handleMove(pawnUpgrade.row, pawnUpgrade.column)
    setPawnUpgrade(false)
    selfDestruct()
    handleResponse(response)
  }

  let upgradeList
  if (pawnUpgrade.turn === "white") {
    upgradeList = ["Q", "B", "R", "N"].map((piece, index) => {
      return (
        <button key={index} id={piece} onClick={upgrade}>
          <img src={pieceConverter[piece].image} className="upgrade-piece"/>
        </button>
      )
    })
  } else {
    upgradeList = ["q", "b", "r", "n"].map((piece, index) => {
      return (
        <button key={index} id={piece} onClick={upgrade}>
          <img src={pieceConverter[piece].image} className="upgrade-piece"/>
        </button>
      )
    })
  }
  return(
    <div>
      <h4>Upgrade Pawn to Which Piece:</h4>
      {upgradeList}
    </div>
  )
}

export default PawnUpgradeDisplay