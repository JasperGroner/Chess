import React from "react";

const CheckDisplay = ( {check} ) => {
    let checkList = []
    if (check && !check.none) {
        if (check.black) {
            checkList.push(<h2>Black in Check</h2>)
        }
        if (check.white) {
            checkList.push(<h2>White in Check</h2>)
        }
    }
    return (<div>
        {checkList}
    </div>)
}

export default CheckDisplay