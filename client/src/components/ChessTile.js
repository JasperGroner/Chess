import React, { useEffect, useState } from "react"
import pieceConverter from "../services/pieceConverter"

const ChessTile = ({color, selectedTile, select, rowId, columnId, boardState, selectedPieceMoves}) => {

    let classes=`cell small-1.5 square square--${color}`
    if (rowId === 0) {
        classes += ` square--top`
    } else if (rowId === 7) {
        classes += ` square--bottom`
    }

    if (columnId === 0) {
        classes += ` square--left`
    } else if (columnId === 7) {
        classes += ` square--right`
    }

    if (selectedTile.row === rowId && selectedTile.column === columnId) {
        classes += ` square--selected`
    }

    selectedPieceMoves.forEach(move => {
        if(move.row === rowId && move.column === columnId) {
            classes += ` square--valid-move`
        }
    })

    const selectTile = () => {
        select(rowId, columnId)
    }
    
    let image = ""
    if (boardState.boardModel[rowId][columnId]) {
        const piece = boardState.boardModel[rowId][columnId]
        image = <img src={pieceConverter[piece].image} />
    }


    return (<div className={classes} onClick={selectTile}>
        {image}
    </div>)
}

export default ChessTile