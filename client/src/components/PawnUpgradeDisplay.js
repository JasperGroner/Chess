import React, { useState } from "react";
import pieceConverter from "../services/pieceConverter"
import CheckDisplay from "./CheckDisplay";

const PawnUpgradeDisplay = ({pawnUpgrade, selfDestruct, boardState, check, setCheck, checkmate, setCheckmate }) => {
  const [ followUpMessage, setFollowUpMessage ] = useState(false)

  const upgrade = event => {
    event.preventDefault()
    const result = boardState.upgradePawn(pawnUpgrade.row, pawnUpgrade.column, event.currentTarget.id)
    if (result.check.black || result.check.white || result.checkmate) {
      setCheck(result.check)
      setCheckmate(result.checkmate)
      setFollowUpMessage(true)
    } else {
      selfDestruct()
    }
  }

  if (!followUpMessage) {
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
      upgradeList = ["Q", "B", "R", "N"].map((piece, index) => {
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
  } else {
    return (
      <div>
        <CheckDisplay check={check} checkmate={checkmate} />
        <button onClick={selfDestruct} className="popup-button button">Okay</button>
      </div>
    )
  }
}

export default PawnUpgradeDisplay