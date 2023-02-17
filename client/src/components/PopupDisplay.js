import React, { useState, useEffect } from "react"
import PawnUpgradeDisplay from "./PawnUpgradeDisplay"
import CheckDisplay from "./CheckDisplay"

const PopupDisplay = ({ pawnUpgrade, check, checkmate, boardState, handleResponse, setPawnUpgrade, selfDestruct })  => {

  let content
  if (pawnUpgrade.display) {
    content = (
      <>    
        <PawnUpgradeDisplay 
          pawnUpgrade={pawnUpgrade} 
          boardState={boardState}
          check={check}
          selfDestruct={selfDestruct}
          handleResponse={handleResponse}
          setPawnUpgrade={setPawnUpgrade}
        />
      </>
    )
  } else if (check.black || check.white || checkmate) {
    content = (
      <> 
        <CheckDisplay check={check} checkmate={checkmate} />
        <button onClick={selfDestruct} className="popup-button button">Okay</button>
      </>
    )
  } else {
    selfDestruct()
  }

  return (
    <div className="popup-display">
      {content}
    </div>
  )
}

export default PopupDisplay