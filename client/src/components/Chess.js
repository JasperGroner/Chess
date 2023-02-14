import React, { useState, useEffect } from "react"
import ChessRow from "./ChessRow"
import Board from "../assets/classes/Boards/Board"
import TurnDisplay from "./TurnDisplay"
import CheckDipslay from "./CheckDisplay"
import CapturedPiecesDisplay from "./CapturedPiecesDisplay"

const Chess = props => {
    let gameState, game

    if (props.location.state) {
        gameState = props.location.state.gameState
        game = props.location.state.game
    }

    const [ selectedTile, setSelectedTile ] = useState({
        row: null,
        column: null
    })

    const [ selectedPieceMoves, setSelectedPieceMoves] = useState([])

    const [ boardState, setBoardState ] = useState(new Board(gameState))

    const [ turn, setTurn ] = useState("")

    const [ check, setCheck ] = useState({})

    const [ checkmate, setCheckmate ] = useState(false)

    const [ capturedPieces, setCapturedPieces ] = useState({
        white: [],
        black: []
    })

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
            rows.push(<ChessRow 
                    firstTile={firstTile} 
                    selectedTile={selectedTile}
                    select={select}
                    boardState={boardState}
                    selectedPieceMoves={selectedPieceMoves}
                    rowId={i} 
                    key={i}
                />)
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
        if (handleClickResponse.turnSwitch) {
            setTurn(handleClickResponse.turnSwitch)
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

    let rows = setUpChessRows()

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
}

export default Chess