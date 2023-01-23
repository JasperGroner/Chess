import React, { useState, useEffect } from "react"
import ChessRow from "./ChessRow"
import ActualBoard from "../assets/classes/Boards/ActualBoard"
import TurnDisplay from "./TurnDisplay"
import CheckDipslay from "./CheckDisplay"

const Chess = props => {
    const [ selectedTile, setSelectedTile ] = useState({
        row: null,
        column: null
    })

    const [ selectedPieceMoves, setSelectedPieceMoves] = useState([])

    const [ boardState, setBoardState ] = useState(new ActualBoard())

    const [ turn, setTurn ] = useState("white")

    const [ check, setCheck ] = useState({})

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
        const handleClickResponse = boardState.handleClick(row, column, turn)
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
        setBoardState(boardState)
    }

    let rows = setUpChessRows()

    return (
    <div>
        <TurnDisplay turn={turn} />
        <div className ="container grid-container">
            {rows}
        </div>
        <CheckDipslay check={check}/>
    </div>)
}

export default Chess