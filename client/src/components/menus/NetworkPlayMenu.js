import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameList from "./GameList";

const NetworkPlayMenu = props => {
  const [ showGameList, setShowGameList ] = useState(false)
  const [ showCompletedGames, setShowCompletedGames ] = useState(false)

  const loadGames = event => {
    event.preventDefault()
    showGameList === false ? setShowGameList(true) : setShowGameList(false)
  }

  const toggleCompletedGames = event => {
    event.preventDefault()
    showCompletedGames === false ? setShowCompletedGames(true) : setShowCompletedGames(false)
  }

  let gameList
  if (showGameList) {
    gameList = <GameList gameType={"network"} gameStatus={"playing"}/>
  }

  let completedGames
  if (showCompletedGames) {
    completedGames = <GameList gameType={"hot seat"} gameStatus={"finished"} />
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
      <Link to={"/lobby"} className="main-menu--item">
        Join an Available Game
      </Link>
      <a href="#" onClick={loadGames} className="main-menu--item">Resume a Game</a>
      {gameList}
      <a href="#" onClick={toggleCompletedGames} className="main-menu--item">Show Completed Game</a>
    </div>
  )
}

export default NetworkPlayMenu