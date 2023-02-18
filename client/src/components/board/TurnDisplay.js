import React from "react";

const TurnDisplay = ({turn}) => {
    let turnString = ""
    
    if (turn) {
        turnString = `${turn[0].toUpperCase() + turn.slice(1)}'s Turn`
    }

    return (
        <div className = "info-display">
            <h1 className = "main-heading">{turnString}</h1>
        </div>
    )
}

export default TurnDisplay