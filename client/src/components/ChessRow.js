import React from "react"
import ChessTile from "./ChessTile"

const ChessRow = ( {firstTile, rowId, selectedTile, select, boardState, selectedPieceMoves} ) => {
    let squareColors = []
    if (firstTile === "white") {
        squareColors = ["white", "black"]
    } else {
        squareColors = ["black", "white"]
    }

    const setUpRow = () => {
        const row = []
        for (let i = 0; i < 8; i++) {
            let color = squareColors[i % 2]
            row.push(
                <ChessTile 
                    color={color} 
                    key={i}
                    columnId={i}
                    rowId={rowId}
                    boardState={boardState}
                    selectedTile={selectedTile}
                    select={select}
                    selectedPieceMoves={selectedPieceMoves}
                />)
        }
        return row
    }

    const row = setUpRow()

    return <div className="row grid-x">{row}</div>
}

export default ChessRow