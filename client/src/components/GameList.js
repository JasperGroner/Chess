import React, { useState, useEffect } from "react";

const GameList = props => {
  const [ gameListData, setGameListData ] = useState([])

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

  const gameListReact = gameListData.map(game => {
    return <li key={game.id}><a href="#">{game.name}</a></li>
  })

  return (
    <ul className="game-list">
      {gameListReact}
    </ul>
  )
}

export default GameList