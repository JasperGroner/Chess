import React, { useState, useEffect } from "react"
import BoardRow from "./BoardRow"
import Chess from "../gameModels/Chess"
import TurnDisplay from "./TurnDisplay"
import CapturedPiecesDisplay from "./CapturedPiecesDisplay"
import NewGameForm from "./NewGameForm"
import PopupDisplay from "./PopupDisplay"
import { io } from "socket.io-client"

const socket = io ()

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
      socket.emit("load game", ({gameId: game.id}))
    }

    socket.on("load game", ({game}) => {
      const loadedGame = new Chess(game.encodedState)
      setBoardState(loadedGame)
      setCapturedPieces(loadedGame.capturedPieces)
      setTurn(loadedGame.turn)
    })

    socket.on("turn switch", ({handleClickResponse}) => {
      boardState.loadGame(handleClickResponse.encodedState)
      saveGameState(handleClickResponse.encodedState)
      handleTurnSwitch(handleClickResponse)
    })

    return(() => {
      socket.off("connect")
      socket.off("turn switch")
      socket.off("load game")
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
    const handleClickResponse = boardState.handleClick(row, column)
    setSelectedPieceMoves(handleClickResponse.moves)
    if ((selectedTile.row === row && selectedTile.column === column) ||
      handleClickResponse.unselect === true) {
      setSelectedTile({row: null, column: null})
    } else {
      setSelectedTile({row, column})
    }
    if (handleClickResponse.pawnUpgrade) {
      setPawnUpgrade(handleClickResponse.pawnUpgrade)
      if (handleClickResponse.pawnUpgrade.display) {
        showPopup()
      }
    } else if (handleClickResponse.turnSwitch) {
      socket.emit("turn switch", {handleClickResponse})
      saveGameState(handleClickResponse.encodedState)
      handleTurnSwitch(handleClickResponse)
    }
  }

  const handleTurnSwitch = (handleClickResponse) => {
    setTurn(handleClickResponse.turnSwitch)
    if (handleClickResponse.check) {
      setCheck(handleClickResponse.check)
      if (handleClickResponse.check.black || handleClickResponse.check.white) {
        showPopup()
      }
    }
    if (handleClickResponse.checkmate) {
      setCheckmate(handleClickResponse.checkmate)
      showPopup()
    }
    if (handleClickResponse.capturedPieces) {
      setCapturedPieces(handleClickResponse.capturedPieces)
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

  let popup = ""
  if (popupState) {
    popup = (
      <PopupDisplay 
        check={check}
        setCheck={setCheck}
        checkmate={checkmate}
        setCheckmate={setCheckmate} 
        pawnUpgrade={pawnUpgrade} 
        setSelectable={setSelectable}
        boardState={boardState}
        setPopupState={setPopupState}
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