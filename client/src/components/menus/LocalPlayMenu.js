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
    loadGameLink = <a href="#" onClick={loadGames} className="main-menu--item">Load Game</a>
  }

  let gameList
  if (showGameList) {
    gameList = <GameList gameType={"hot seat"} />
  }

  let newGameLink="/chess"
  if (currentUser) {
    newGameLink="/chess/new"
  }

  return (
    <div className="centered-content">
      <Link to={newGameLink} className="main-menu--item">New Game</Link>
      {loadGameLink}
      {gameList}
    </div>
  )
}

export default LocalPlayMenu