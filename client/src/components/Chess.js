import React, { useState, useEffect } from "react"
import ChessRow from "./ChessRow"
import Board from "../assets/classes/Boards/Board"
import TurnDisplay from "./TurnDisplay"
import CheckDipslay from "./CheckDisplay"
import CapturedPiecesDisplay from "./CapturedPiecesDisplay"
import NewGameForm from "./NewGameForm"

const Chess = props => {
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

    const [ selectedPieceMoves, setSelectedPieceMoves] = useState([])

    const [ boardState, setBoardState ] = useState(new Board(gameState))

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
                firstTile = "white"
            } else {
                firstTile = "black"
            }
            rows.push(
              <ChessRow 
                firstTile={firstTile} 
                selectedTile={selectedTile}
                select={select}
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
      }
      if (handleClickResponse.checkmate) {
          setCheckmate(handleClickResponse.checkmate)
      }
      if (handleClickResponse.capturedPieces) {
          setCapturedPieces(handleClickResponse.capturedPieces)
      }
      setBoardState(boardState)
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

    if (!currentUser || game) {
        return (
            <div className="page-container">
                <CapturedPiecesDisplay capturedPieces={capturedPieces.white} color="Black" />
                <div className="game-display">
                    <TurnDisplay turn={turn} />
                    <div className ="container grid-container">
                        {rows}
                    </div>
                    <CheckDipslay check={check} checkmate={checkmate}/>
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

export default Chess