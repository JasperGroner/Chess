import React, { useState, useEffect } from "react"
import PawnUpgradeDisplay from "./PawnUpgradeDisplay"
import CheckDisplay from "./CheckDisplay"

const PopupDisplay = props => {
  const { pawnUpgrade, check, checkmate, setSelectable } = props

  const [ deleteSelf, setDeleteSelf ] = useState(false)
  const [ update, setUpdate ] = useState(true)

  useEffect(() => {
    setSelectable(false)
  }, [])

  const selfDestruct = event => {
    setSelectable(true)
    setDeleteSelf(true)
  }

  let content
  if (pawnUpgrade.display) {
    content= (
      <>    
        <PawnUpgradeDisplay pawnUpgrade={pawnUpgrade} />
        <button onClick={selfDestruct} className="popup-button button">Okay</button>
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

  if (deleteSelf) {
    return <></>
  }

  return (
    <div className="popup-display">
      {content}
    </div>
  )
}

export default PopupDisplay