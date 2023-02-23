import React from "react";
import AutoReplayDisplay from "./AutoReplayDisplay";

const TurnDisplay = ({turn, gameStatus, replayIndex, updateReplayState, playerNames, replayLength}) => {
  const changeState = event => {
    const modifier = parseInt(event.currentTarget.getAttribute("value"))
    const newLocation = replayIndex + modifier
    if (newLocation >= 0 && newLocation < replayLength) {
      updateReplayState(newLocation)
    }
  }

  let replayDisplay
  if (gameStatus === "finished") {
    replayDisplay = (
      <AutoReplayDisplay
        updateReplayState={updateReplayState}
        replayLength={replayLength}
      />
    )
  }

  let turnString = ""

  let leftArrow, rightArrow
  if (gameStatus === "finished" && replayIndex > 0) {
    leftArrow = <button className="button replay-button" onClick={changeState} value="-1"><i className="fa-solid fa-arrow-left" /></button>
  }
  if (gameStatus === "finished" && replayIndex < replayLength - 1) {
    rightArrow = <button className="button replay-button" onClick={changeState} value="1"><i className="fa-solid fa-arrow-right"/></button>
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
        {replayDisplay}{turnString}<span className="arrows">{leftArrow}{rightArrow}</span>
      </h1>
    </div>
  )
}

export default TurnDisplay