import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameList from "./GameList";

const Menu = ({ currentUser }) => {
  const [ showGameList, setShowGameList ] = useState(false)

  const loadGame = event => {
    event.preventDefault()
    setShowGameList(true)
  }

  let loadGameLink
  if (currentUser) {
    loadGameLink = <a href="#" onClick={loadGame}>Load Game</a>
  }

  let gameList
  if (showGameList) {
    gameList = <GameList />
  }

  return (
    <div className="main-menu">
      <Link to="/chess">New Game</Link><br />
      {loadGameLink}
      {gameList}
    </div>
  )
}

export default Menu