import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const GameList = ({gameType}) => {
  const [ gameListData, setGameListData ] = useState([])
  const [ shouldRedirect, setShouldRedirect ] = useState(false)
  const [ game, setGame ] = useState({})

  const getGames = async () => {
    try {
      const response = await fetch(`/api/v1/games/type/${gameType}`)
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
        throw new Error(`OH NO: ${response.status} (${response.statusText})`)
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
        }
      }}/>
    )
  }

  const gameListReact = gameListData.map(game => {
    return (
      <li key={game.id} className="main-menu--item">
        <a href="#" id={game.id} onClick={loadGameClickHandler} className="load-game">{game.name}</a>
        <i className="fa-solid fa-trash delete-game" onClick={deleteGameHandler} id={game.id}></i>
      </li>
    )
  })

  return (
    <ul className="game-list">
      <h2>Available Games</h2>
      {gameListReact}
    </ul>
  )
}

export default GameList