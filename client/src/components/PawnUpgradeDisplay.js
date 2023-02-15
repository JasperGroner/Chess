import React from "react";
import pieceConverter from "../services/pieceConverter"


const PawnUpgradeDisplay = ({pawnUpgrade}) => {
  let upgradeList
  if (pawnUpgrade.turn === "white") {
    upgradeList = (
      <div>
        <img src={pieceConverter["Q"].image} className="upgrade-piece"/>
        <img src={pieceConverter["B"].image} className="upgrade-piece"/>
        <img src={pieceConverter["R"].image} className="upgrade-piece"/>
        <img src={pieceConverter["N"].image} className="upgrade-piece"/>
      </div>
    )
  } else {
    upgradeList = (
      <div>
        <img src={pieceConverter["q"].image} className="upgrade-piece"/>
        <img src={pieceConverter["b"].image} className="upgrade-piece"/>
        <img src={pieceConverter["r"].image} className="upgrade-piece"/>
        <img src={pieceConverter["n"].image} className="upgrade-piece"/>
      </div>
    )
  }
  return (
    <div>
      <h4>Upgrade Pawn to Which Piece:</h4>
      {upgradeList}
    </div>
  )
}

export default PawnUpgradeDisplay