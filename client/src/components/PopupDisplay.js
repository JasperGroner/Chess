import React, {useState} from "react"

const PopupDisplay = ({content, selfDestructing}) => {
  const [ deleteSelf, setDeleteSelf ] = useState(false)

  const selfDestruct = event => {
    if (selfDestructing) {
      setDeleteSelf(true)
    }
  }

  if (deleteSelf) {
    return <></>
  }

  return (
    <div className="popup-display" onClick={selfDestruct}>
      {content}
    </div>
  )
}

export default PopupDisplay