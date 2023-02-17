import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const GameList = props => {
  const [ gameListData, setGameListData ] = useState([])
  const [ shouldRedirect, setShouldRedirect ] = useState(false)
  const [ game, setGame ] = useState({})

  const getGames = async () => {
    try {
      const response = await fetch("/api/v1/games")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setGameListData(body.games)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getGames()
  }, [])

  const loadGameClickHandler = async (event) => {
    event.preventDefault()
    const gameId = event.target.id
    await loadGame(gameId)
  }

  const loadGame = async (gameId) => {
    try {
      const response = await fetch(`/api/v1/games/${gameId}/load`)
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
    return <li key={game.id} className="main-menu--item"><a href="#" id={game.id} onClick={loadGameClickHandler}>{game.name}</a></li>
  })

  return (
    <ul className="game-list">
      {gameListReact}
    </ul>
  )
}

export default GameList