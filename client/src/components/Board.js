import React, { useState, useEffect } from "react"
import BoardRow from "./BoardRow"
import Chess from "../gameModels/Chess"
import TurnDisplay from "./TurnDisplay"
import CapturedPiecesDisplay from "./CapturedPiecesDisplay"
import PopupDisplay from "./PopupDisplay"
import { io } from "socket.io-client"

const socket = io({
  autoConnect: false
})

const Board = props => {
  let gameData

  const { currentUser } = props

  if (props.location.state) {
    gameData = props.location.state.game
  }

  const [ game, setGame ] = useState(gameData)

  const [ selectedTile, setSelectedTile ] = useState({
    row: null,
    column: null
  })

  const [ popupState, setPopupState ] = useState(false)

  const [ selectable, setSelectable ] = useState(true)

  const [ pawnUpgrade, setPawnUpgrade ] = useState({display: false})

  const [ selectedPieceMoves, setSelectedPieceMoves] = useState([])

  const [ boardState, setBoardState ] = useState(new Chess())

  const [ turn, setTurn ] = useState("")

  const [ check, setCheck ] = useState({})

  const [ checkmate, setCheckmate ] = useState(false)

  const [ capturedPieces, setCapturedPieces ] = useState(boardState.capturedPieces)

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to back end")
    })

    if (game && game.id) {
      socket.connect()

      socket.emit("load game", ({gameId: game.id}))

      socket.on("load game", ({game}) => {
        const loadedGame = new Chess(game.encodedState)
        setBoardState(loadedGame)
        setCapturedPieces(loadedGame.capturedPieces)
        setTurn(loadedGame.turn)
      })

      socket.on("turn switch", ({response}) => {
        boardState.loadGame(response.encodedState)
        saveGameState(response.encodedState)
        handleTurnSwitch(response)
      })

    } else {
      setTurn("white")
    }

    return(() => {
      socket.off("connect")
      socket.off("turn switch")
      socket.off("load game")
      socket.disconnect()
    })
  }, [])

  const setUpChessRows = () => {
    const rows = []
    for (let i = 0; i < 8; i++) {
      let firstTile
      if (i % 2 === 0) {
        firstTile = "light"
      } else {
        firstTile = "dark"
      }
      rows.push(
        <BoardRow 
          firstTile={firstTile} 
          selectedTile={selectedTile}
          select={select}
          selectable={selectable}
          boardState={boardState}
          selectedPieceMoves={selectedPieceMoves}
          rowId={i} 
          key={i}
        />
      )
    }
    return rows
  }

  const select = (row, column) => {
    const response = boardState.handleClick(row, column)
    handleResponse(response, row, column)
  }

  const handleResponse = (response, row, column) => {
    setSelectedPieceMoves(response.moves)
    if (response.capturedPieces) {
      setCapturedPieces(response.capturedPieces)
    }
    if ((selectedTile.row === row && selectedTile.column === column) ||
      response.unselect === true) {
      setSelectedTile({row: null, column: null})
    } else {
      setSelectedTile({row, column})
    }
    if (response.pawnUpgrade) {
      setPawnUpgrade(response.pawnUpgrade)
      showPopup()
      setBoardState(boardState)
    } else if (response.turnSwitch) {
      if (game) {
        socket.emit("turn switch", {response, gameId: game.id})
        saveGameState(response.encodedState)
      }
      handleTurnSwitch(response)
    }
  }

  const handleTurnSwitch = (response) => {
    setTurn(response.turnSwitch)
    if (response.check) {
      setCheck(response.check)
      if (response.check.black || response.check.white) {
        showPopup()
      }
    }
    if (response.checkmate) {
      setCheckmate(response.checkmate)
      showPopup()
    }
    if (response.capturedPieces) {
      setCapturedPieces(response.capturedPieces)
    }
    setBoardState(boardState)
  }

  const showPopup = () => {
    setPopupState(true)
    setSelectable(false)
  }

  const saveGameState = (encodedState) => {
    socket.emit("game state", {gameId: game.id, encodedState})
  }

  let rows = setUpChessRows()

  const selfDestruct = event => {
    setSelectable(true)
    setPopupState(false)
  }

  let popup = ""
  if (popupState) {
    popup = (
      <PopupDisplay 
        check={check}
        checkmate={checkmate}
        pawnUpgrade={pawnUpgrade} 
        selfDestruct={selfDestruct}
        boardState={boardState}
        handleResponse={handleResponse}
        setPawnUpgrade={setPawnUpgrade}
      />
    )
  } else {
    popup = ""
  }

  if (!currentUser || game) {
    return (
      <div className="chess-page-container">
        {popup}
        <CapturedPiecesDisplay capturedPieces={capturedPieces.white} color="Black" />
        <div className="game-display">
          <TurnDisplay turn={turn} />
          <div className ="container">
            {rows}
          </div>
        </div>
        <CapturedPiecesDisplay capturedPieces={capturedPieces.black} color="White" />
      </div>
    )
  } 
}

export default Board