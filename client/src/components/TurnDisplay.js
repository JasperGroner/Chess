import React from "react";

const TurnDisplay = ({turn}) => {
    const turnString = turn[0].toUpperCase() + turn.slice(1)

    return (
        <div className = "info-display">
            <h1>{turnString} Player's Turn</h1>
        </div>
    )
}

export default TurnDisplay