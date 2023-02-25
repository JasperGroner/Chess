import React from "react"

const AutoReplayDisplay = ({updateReplayState, replayLength}) => {
  const autoReplay = async event => {
    event.preventDefault()
    let newLocation = 0
    while (newLocation < replayLength) {
      updateReplayState(newLocation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      newLocation++
    }
  }

  return (
    <a href="#" onClick={autoReplay} className="replay-game"><i className="fa-solid fa-play" /></a>
  )
}

export default AutoReplayDisplay
