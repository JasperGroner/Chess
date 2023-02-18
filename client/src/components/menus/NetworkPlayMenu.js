import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameList from "./GameList";

const NetworkPlayMenu = props => {
  const [ showGameList, setShowGameList ] = useState(false)

  const loadGames = event => {
    event.preventDefault()
    showGameList === false ? setShowGameList(true) : setShowGameList(false)
  }

  let gameList
  if (showGameList) {
    gameList = <GameList gameType={"network"} />
  }

  return (
    <div className="main-menu--submenu">
      <Link 
        className="main-menu--item"
        to={{
          pathname: "/chess/new",
          state: {gameType: "network"}
        }}
      >
        Create a New Game
      </Link>
      <Link to={"/chess/join"} className="main-menu--item">
        Join an Available Game
      </Link>
      <a href="#" onClick={loadGames} className="main-menu--item">Resume a Game</a>
      {gameList}
    </div>
  )
}

export default NetworkPlayMenu