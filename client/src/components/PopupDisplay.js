import React from "react"

const PopupDisplay = props => {
  if (!props.children) {
    props.selfDestruct()
  }

  return (
    <div className="popup-display">
      {props.children}
    </div>
  )
}

export default PopupDisplay