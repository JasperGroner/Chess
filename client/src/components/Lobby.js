import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io({
  autoConnect: false
})

const Lobby = props => {
  const [ activeGameList, setActiveGameList ] = useState([])

  useEffect(() => {
    socket.connect()

    socket.emit("get available games")

    socket.emit("join lobby")

    if (props.location.state &&
        props.location.state.game) {
      socket.emit("update available games")
    }

    socket.on("available games", ({games}) => {
      setActiveGameList(games)
    })

    return(() => {
      socket.emit("leave lobby")
      socket.off("available games")
    })
  }, [])

  const activeGameReact = activeGameList.map(game => {
    return <a href="#" onClick={joinGame} key={game.id} className="main-menu--item">{game.name}</a>
  })

  const joinGame = event => {
    event.preventDefault()
  }

  return (
    <div className="sub-page-container">
      <div className="centered-content">
      <h1>Gamers' Lobby</h1>
      <div className="lobby--active-game-display--frame">
        <h2>Available Games:</h2>
        <div className="lobby--active-game-display">
          {activeGameReact}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Lobby