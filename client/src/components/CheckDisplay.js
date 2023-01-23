import React from "react";

const CheckDisplay = ( {check} ) => {
    const blackCheck = check.black ? <h2>Black in Check</h2> : ""
    const whiteCheck = check.white ? <h2>White in Check</h2> : ""
    return (<div className="info-display">
        {blackCheck}
        {whiteCheck}
    </div>)
}

export default CheckDisplay