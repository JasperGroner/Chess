import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameList from "./GameList";

const LocalPlayMenu = ({ currentUser }) => {
  const [ showGameList, setShowGameList ] = useState(false)

  const loadGames = event => {
    event.preventDefault()
    showGameList === false ? setShowGameList(true) : setShowGameList(false)
  }

  let loadGameLink
  if (currentUser) {
    loadGameLink = <a href="#" onClick={loadGames} className="main-menu--item">Resume a Game</a>
  }

  let gameList
  if (showGameList) {
    gameList = <GameList gameType={"hot seat"} gameStatus={"paused"} />
  }

  let newGameLink="/chess"
  let gameType
  if (currentUser) {
    newGameLink="/chess/new"  
    gameType="hot seat"
  }

  return (
    <div className="main-menu--submenu">
      <Link 
        className="main-menu--item"
        to={{
          pathname: newGameLink,
          state: { gameType: gameType }
        }}
      >
          Create a New Game
      </Link>
      {loadGameLink}
      {gameList}
    </div>
  )
}

export default LocalPlayMenu