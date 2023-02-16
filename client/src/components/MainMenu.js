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
    loadGameLink = <a href="#" onClick={loadGame} className="main-menu--item">Load Game</a>
  }

  let gameList
  if (showGameList) {
    gameList = <GameList />
  }

  return (
    <div className="centered-content">
      <h1 className="main-menu--header">Welcome to the Chess App!</h1>
      <Link to="/chess" className="main-menu--item">New Game</Link><br />
      {loadGameLink}
      {gameList}
    </div>
  )
}

export default Menu