import React, { useState } from "react";
import LocalPlayMenu from "./LocalPlayMenu";
import NetworkPlayMenu from "./NetworkPlayMenu";

const MainMenu = ({currentUser}) => {
  const [ showSubMenu, setShowSubMenu ] = useState(false)

  const showSoloMenu = event => {
    event.preventDefault()
    showSubMenu !== "solo" ? setShowSubMenu("solo") : setShowSubMenu(false)
  }

  const showNetworkMenu = event => {
    event.preventDefault()
    showSubMenu !== "network" ? setShowSubMenu("network") : setShowSubMenu(false)
  }

  let subMenu
  if (showSubMenu === "solo") {
    subMenu=<LocalPlayMenu currentUser={currentUser} />
  } else if (showSubMenu === "network") {
    subMenu=<NetworkPlayMenu />
  }

  return (
    <div className="centered-content">
      <h1 className="main-menu--header">Welcome to the Chess App!</h1>
      <a href="#" onClick={showSoloMenu} className="main-menu--item">
        Play a Local Game
      </a>
      <a href="#" onClick={showNetworkMenu} className="main-menu--item">
        Play an Online Opponent
      </a>
      {subMenu}
    </div>
  )
}

export default MainMenu