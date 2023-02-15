import React, {useState} from "react"

const PopupDisplay = props => {
  const { selfDestructing } = props
  const [ deleteSelf, setDeleteSelf ] = useState(false)

  const selfDestruct = event => {
    setDeleteSelf(true)
  }

  let okayButton = ""
  if (selfDestructing) {
    okayButton = <button onClick={selfDestruct} className="popup-button button">Okay</button>
  }

  if (deleteSelf) {
    return <></>
  }

  return (
    <div className="popup-display">
      {props.children}
      {okayButton}
    </div>
  )
}

export default PopupDisplay