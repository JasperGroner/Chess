import React, {useState} from "react"
import PawnUpgradeDisplay from "./PawnUpgradeDisplay"
import CheckDisplay from "./CheckDisplay"

const PopupDisplay = props => {
  const { pawnUpgrade, check, checkmate } = props

  const [ deleteSelf, setDeleteSelf ] = useState(false)
  const [ update, setUpdate ] = useState(true)

  const selfDestruct = event => {
    setDeleteSelf(true)
  }

  let content
  if (pawnUpgrade.display) {
    content = <PawnUpgradeDisplay pawnUpgrade={pawnUpgrade} />
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