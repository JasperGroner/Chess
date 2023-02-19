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
    return <p key={game.id}>{game.name}</p>
  })


  return (
    <div className="sub-page-container">
      <div className="centered-content">
      <h1>Gamers' Lobby</h1>
      {activeGameReact}
      </div>
    </div>
  )
}

export default Lobby