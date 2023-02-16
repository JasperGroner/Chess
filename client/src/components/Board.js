import React, { useState, useEffect } from "react"
import BoardRow from "./BoardRow"
import Chess from "../assets/classes/Chess"
import TurnDisplay from "./TurnDisplay"
import CapturedPiecesDisplay from "./CapturedPiecesDisplay"
import NewGameForm from "./NewGameForm"
import PopupDisplay from "./PopupDisplay"

const Board = props => {
  let gameState, gameData

  const { currentUser } = props

  if (props.location.state) {
    gameState = props.location.state.gameState
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

  const [ boardState, setBoardState ] = useState(new Chess(gameState))

  const [ turn, setTurn ] = useState("")

  const [ check, setCheck ] = useState({})

  const [ checkmate, setCheckmate ] = useState(false)

  const [ capturedPieces, setCapturedPieces ] = useState(boardState.capturedPieces)

  useEffect(() => {
    setTurn(boardState.turn)
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

  const select = async (row, column) => {
    const handleClickResponse = boardState.handleClick(row, column)
    setSelectedPieceMoves(handleClickResponse.moves)
    if ((selectedTile.row === row && selectedTile.column === column) ||
      handleClickResponse.unselect === true) {
      setSelectedTile({row: null, column: null})
    } else {
      setSelectedTile({row, column})
    }
    if (handleClickResponse.turnSwitch) {
      setTurn(handleClickResponse.turnSwitch)
      if (currentUser) {
        await saveGameState(handleClickResponse.encodedState)
      }
    }
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
    if (handleClickResponse.pawnUpgrade) {
      setPawnUpgrade(handleClickResponse.pawnUpgrade)
      if (handleClickResponse.pawnUpgrade.display) {
        showPopup()
      }
    }
    setBoardState(boardState)
  }

  const showPopup = () => {
    setPopupState(true)
    setSelectable(false)
  }

  const saveGameState = async (encodedState) => {
    try {
      const response = await fetch(`/api/v1/games/${game.id}/gameState`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({encodedState})
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      } else {
        return true
      }
    } catch(error) {
        console.error(`Error in fetch: ${error.message}`)
    }
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
  } else {
    return (
      <NewGameForm setGame={setGame} />
    )
  }
}

export default Board