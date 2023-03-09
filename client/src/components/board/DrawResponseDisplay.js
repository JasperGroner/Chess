import React from "react";

const DrawResponseDisplay = ({response, selfDestruct, selfDestructNoInteraction}) => {
  let content
  if (response === "accepted") {
    content = (
      <>
        <h4>Game ends in a draw.</h4>
        <button onClick={selfDestructNoInteraction} className="popup-button button">Okay</button>
      </>
    )
  } else {
    content = (
      <>
        <h4>Request for draw denied.</h4>
        <button onClick={selfDestruct} className="popup-button button">Okay</button>
      </>
    )
  }
  return content
}

export default DrawResponseDisplay