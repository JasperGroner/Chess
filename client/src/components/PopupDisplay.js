import React, { useState, useEffect } from "react"
import PawnUpgradeDisplay from "./PawnUpgradeDisplay"
import CheckDisplay from "./CheckDisplay"

const PopupDisplay = ({ pawnUpgrade, check, setCheck, checkmate, setCheckmate, setSelectable, boardState, setBoardState, setPopupState })  => {
  const selfDestruct = event => {
    setSelectable(true)
    setPopupState(false)
  }

  let content
  if (pawnUpgrade.display) {
    content = (
      <>    
        <PawnUpgradeDisplay 
          pawnUpgrade={pawnUpgrade} 
          boardState={boardState}
          setBoardState={setBoardState}
          selfDestruct={selfDestruct}
          check={check}
          setCheck={setCheck}
          checkmate={checkmate}
          setCheckmate={setCheckmate}
        />
      </>
    )
  } 
  if (check.black || check.white || checkmate) {
    content = (
      <> 
        <CheckDisplay check={check} checkmate={checkmate} />
        <button onClick={selfDestruct} className="popup-button button">Okay</button>
      </>
    )
  }

  return (
    <div className="popup-display">
      {content}
    </div>
  )
}

export default PopupDisplay