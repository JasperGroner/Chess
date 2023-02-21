import React from "react";

const TurnDisplay = ({turn, gameStatus, replayIndex, setReplayIndex, allGameStates, boardState, setBoardState}) => {
  const changeState = event => {
    const modifier = parseInt(event.currentTarget.getAttribute("value"))
    const newLocation = replayIndex + modifier
    if (newLocation >= 0 && newLocation < allGameStates.length - 1) {
      setReplayIndex(newLocation)
      boardState.loadGame(allGameStates[newLocation].encodedState)
      setBoardState(boardState)
    }
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