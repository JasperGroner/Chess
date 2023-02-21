import React from "react";
import GameDecoder from "../../gameModels/GameDecoder"

const TurnDisplay = ({turn, gameStatus, replayIndex, updateReplayState}) => {
  const changeState = event => {
    const modifier = parseInt(event.currentTarget.getAttribute("value"))
    const newLocation = replayIndex + modifier
    updateReplayState(newLocation)
  }

  let turnString = ""
    
  if (turn) {
    turnString = `${turn[0].toUpperCase() + turn.slice(1)}'s Turn`
  } else {
    turnString = "Loading..."
  }

  let leftArrow, rightArrow
  if (gameStatus === "finished") {
    leftArrow = <i className="fa-solid fa-arrow-left" onClick={changeState} value="-1"/>
    rightArrow = <i className="fa-solid fa-arrow-right" onClick={changeState} value="1"/>
  }

  return (
    <div className = "info-display">
      <h1 className = "main-heading">{leftArrow}{turnString}{rightArrow}</h1>
    </div>
  )
}

export default TurnDisplay