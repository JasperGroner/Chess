import React from "react";

const WrongMoveDisplay = ({selfDestruct, setWrongMove}) => {
  const tryAgain = event => {
    event.preventDefault()
    setWrongMove(false)
    selfDestruct()
  }

  return (
    <div className="popup-message">
      <h2>Wrong move, try again</h2>
      <button onClick={tryAgain} className="popup-button button">I won't give up!</button>
    </div>
  )
}

export default WrongMoveDisplay