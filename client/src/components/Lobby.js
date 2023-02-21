import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "./chat/Chat";

const socket = io({
  autoConnect: false
})

const Lobby = props => {
 
  let gameId, passedColor
  if (props.location.state) {
    gameId = props.location.state.game.id
    passedColor = props.location.state.color
  }

  const { currentUser, setChatSocket } = props

  if ( currentUser === null) {
    return <Redirect to="/user-sessions/new"/>
  }

  const [ activeGameList, setActiveGameList ] = useState([])
  const [ joinedGameId, setJoinedGameId ] = useState(gameId)
  const [ startingGame, setStartingGame ] = useState({})
  const [ color, setColor ] = useState(passedColor)

  useEffect(() => {
    setChatSocket(socket)

    socket.connect()

    socket.emit("get available games")

    socket.emit("join lobby")

    if (props.location.state &&
        props.location.state.game) {
      socket.emit("update available games")
    }

    socket.on("available games", ({games}) => {
      if (!gameId) {
        setActiveGameList(games)
      }
    })

    socket.on("game starting", ({startingGame}) => {
      setStartingGame(startingGame)
    })

    return(() => {
      socket.emit("leave lobby", ({gameId}))
      setChatSocket(null)
      socket.off("available games")
      socket.off("game starting")
    })
  }, [])

  const joinGame = event => {
    event.preventDefault()
    const gameId = event.currentTarget.id
    let availableColor
    if (event.currentTarget.getAttribute("color") === "white") {
      availableColor = "black"
    } else {
      availableColor = "white"
    }
    setJoinedGameId(gameId)
    setColor(availableColor)
    socket.emit("join game", {gameId, availableColor})
  }

  const activeGameReact = activeGameList.map(game => {
    if (!currentUser || game.players[0].userId !== currentUser.id) {
      return (
        <div key={game.id}>
          <a href="#" onClick={joinGame} id={game.id} color={game.players[0].color} className="lobby--active-game-display--item">{game.name}</a>
          <p>Created by {game.players[0].username}, who will be playing {game.players[0].color}</p>
        </div>
      )
    }
  })

  if (joinedGameId && startingGame.id === joinedGameId) {
    return (
      <Redirect to={{
        pathname: "/chess",
        state: {
          game: startingGame,
          color: color
        }
      }}/>
    )
  }

  let title = "Available Games:"
  if (gameId) {
    title = "Waiting for an Opponent"
  }

  return (
    <div className="sub-page-container">
      <div className="centered-content">
        <h1>Gamers' Lobby</h1>
        <div className="lobby--active-game-display--frame">
          <h2>{title}</h2>
          <div className="lobby--active-game-display">
            {activeGameReact}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lobby