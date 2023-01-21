import React, { useState, useEffect } from "react"
import ChessRow from "./ChessRow"
import Board from "../assets/classes/Board"
import TurnDisplay from "./TurnDisplay"

const Chess = props => {
    const [ selectedTile, setSelectedTile ] = useState({
        row: null,
        column: null
    })

    const [ selectedPieceMoves, setSelectedPieceMoves] = useState([])

    const [ boardState, setBoardState ] = useState(new Board())

    const [ turn, setTurn ] = useState("white")

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
            turn === "white" ? setTurn("black") : setTurn("white")
        }
        setBoardState(boardState)
    }

    let rows = setUpChessRows()

    return (
    <div>
        <TurnDisplay turn={turn} />
        <div className ="container grid-container">
            {rows}
        </div>
    </div>)
}

export default Chess