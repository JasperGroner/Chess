import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameList from "./GameList";

const LocalPlayMenu = ({ currentUser }) => {
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

  let loadGameLink, completedGamesLink, newGameLink
  if (currentUser) {
    loadGameLink = <a href="#" onClick={loadGames} className="main-menu--item">Resume a Game</a>
    completedGamesLink = <a href="#" onClick={toggleCompletedGames} className="main-menu--item">Show Completed Games</a>
    newGameLink = (
      <Link 
        className="main-menu--item"
        to={{
          pathname: "/chess/new",
          state: { gameType: "hot seat" }
        }}
      >
        Create a New Game
      </Link>
    )
  } else {
    newGameLink = (
      <Link 
        className="main-menu--item"
        to = {{
          pathname: "/chess",
          state: { color: "both"}
        }}
      >
        Create a New Game
      </Link>
    )
  }

  let gameList
  if (showGameList) {
    gameList = <GameList gameType={"hot seat"} gameStatus={"playing"} />
  }

  let completedGames
  if (showCompletedGames) {
    completedGames = <GameList gameType={"hot seat"} gameStatus={"finished"} />
  }

  return (
    <div className="main-menu--submenu">
      {newGameLink}
      {loadGameLink}
      {gameList}
      {completedGamesLink}
      {completedGames}
    </div>
  )
}

export default LocalPlayMenu