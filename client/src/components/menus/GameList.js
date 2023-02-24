import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const GameList = ({gameType, gameStatus}) => {
  const [ gameListData, setGameListData ] = useState([])
  const [ shouldRedirect, setShouldRedirect ] = useState(false)
  const [ game, setGame ] = useState({})

  const getGames = async () => {
    try {
      const response = await fetch(`/api/v1/games/type/${gameType}${gameStatus ? "/" + gameStatus : ""}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setGameListData(body.games)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const loadGame = async (gameId) => {
    try {
      const response = await fetch(`/api/v1/games/${gameId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      } 
      const body = await response.json()
      setGame(body.game)
      setShouldRedirect(true)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deleteGame = async (gameId) => {
    try {
      const response = await fetch(`/api/v1/games/${gameId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setGameListData(gameListData.filter(game => game.id !== body.gameId))
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getGames()
  }, [])

  const loadGameClickHandler = async (event) => {
    event.preventDefault()
    const gameId = event.currentTarget.id
    await loadGame(gameId)
  }

  const deleteGameHandler = async(event) => {
    event.preventDefault()
    const gameId = event.currentTarget.id
    await deleteGame(gameId)
  }

  if (shouldRedirect) {
    return (
      <Redirect to={{
        pathname: '/chess',
        state: { 
          game: game,
          color: game.color
        }
      }}/>
    )
  }

  let showDelete = (gameStatus !== "playing" || gameType !== "network") && gameType !== "puzzle"

  const gameListReact = gameListData.map(game => {
    let deleteButton, detail, loadClass
    if (showDelete) {
      deleteButton = <i className="fa-solid fa-trash delete-game" onClick={deleteGameHandler} id={game.id}></i>
      loadClass="load-game"
    } else {
      loadClass="load-game--no-delete"
    }
    if (gameType !== "puzzle") {
      detail = <p className="load-game--detail">(Color: {game.color}) (Opponent: {game.opponent || "none"})</p>
    } else {
      detail = <p className="load-game--detail">(Moves to Check: {game.puzzleMoves.length / 2})</p>
    }
    return (
      <li key={game.id} className="main-menu--game-list--item">
        <a href="#" id={game.id} onClick={loadGameClickHandler} className={loadClass} color={game.color}>{game.name}</a>
        {deleteButton}
        {detail}
      </li>
    )
  })

  let title = "Available Games"
  if (gameType === "puzzle") {
    title = "Daily Puzzles"
  }

  return (
    <div className="main-menu--game-list--header">
      <h2>{title}</h2>
      <ul className="main-menu--game-list">
        {gameListReact}
      </ul>
    </div>
  )
}

export default GameList