import React from "react";

const TurnDisplay = ({turn, gameStatus, replayIndex, updateReplayState, playerNames}) => {
  const changeState = event => {
    const modifier = parseInt(event.currentTarget.getAttribute("value"))
    const newLocation = replayIndex + modifier
    updateReplayState(newLocation)
  }

  let turnString = ""

  let leftArrow, rightArrow
  if (gameStatus === "finished") {
    leftArrow = <button class="button replay-button" onClick={changeState} value="-1"><i className="fa-solid fa-arrow-left" /></button>
    rightArrow = <button class="button replay-button" onClick={changeState} value="1"><i className="fa-solid fa-arrow-right"/></button>
  }

  let nameDisplay = ""
  if (playerNames[turn]) {
    nameDisplay = `${playerNames[turn]} (`
  }

  if (turn) {
    turnString = `${nameDisplay}${turn[0].toUpperCase() + turn.slice(1)}${nameDisplay ? ")" : ""}'s Turn`
  } else {
    turnString = "Loading..."
  }

  return (
    <div className="info-display">
      <h1 className="main-heading">
        {leftArrow}{turnString}{rightArrow}
      </h1>
    </div>
  )
}

export default TurnDisplay